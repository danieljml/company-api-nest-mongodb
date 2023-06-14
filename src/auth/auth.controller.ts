import {
  Controller,
  Bind,
  Request,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './auth.custom-decorators';
import { User } from '../users/users.model';
import { AuthenticationService } from './auth.service';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @Bind(Request())
  async login(req) {
    return this.authenticationService.login(req.user);
  }

  @Public()
  @Post('auth/signup')
  async signUp(@Body() user: User): Promise<User> {
    return this.authenticationService.signUp(user);
  }
}
