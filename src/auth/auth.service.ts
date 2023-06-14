import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { promisify } from 'util';
import { sanitize } from 'sanitizer';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly SALT_ROUNDS: number = 10;

  async signUp(user: User): Promise<User> {
    const { username, password } = user;
    const sanitizedUsername = sanitize(username);

    const existingUser = await this.usersService.findByUsername(
      sanitizedUsername,
    );
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await promisify(bcrypt.hash)(
      password,
      this.SALT_ROUNDS,
    );

    return this.usersService.create({
      ...user,
      username: sanitizedUsername,
      password: hashedPassword,
    });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    if (!username) {
      throw new BadRequestException('Username not provided');
    }
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException(`User "${username}" was not found`);
    }
    const gotTheSamePassword = await promisify(bcrypt.compare)(
      password,
      user.password,
    );
    if (user && gotTheSamePassword) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    if (!user.username) {
      throw new BadRequestException('Username not provided');
    }
    const existingUser = await this.usersService.findByUsername(user.username);
    if (!existingUser) {
      throw new NotFoundException(`User "${user.username}" was not found`);
    }
    const payload = {
      username: existingUser.username,
      sub: existingUser['_id'],
    };
    return {
      access_token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
