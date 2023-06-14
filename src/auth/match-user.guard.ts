import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class MatchUserGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);
    if (!token) {
      return false;
    }
    const decodedToken = this.decodeToken(token);
    if (!decodedToken) {
      return false;
    }
    const userId = decodedToken.sub;
    if (!userId || request?.params?.id !== userId) {
      return false;
    }
    return true;
  }

  private isAuthorizationHeaderValid(authorizationHeader: string): boolean {
    return (
      authorizationHeader &&
      authorizationHeader.startsWith('Bearer') &&
      authorizationHeader.split(' ').length == 2
    );
  }

  private extractTokenFromRequest(request: any): string | null {
    const authorizationHeader = request.headers.authorization || '';
    if (!this.isAuthorizationHeaderValid(authorizationHeader)) {
      return null;
    }
    return authorizationHeader.split(' ')[1];
  }

  private decodeToken(token: string): any {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (e) {
      return null;
    }
  }
}
