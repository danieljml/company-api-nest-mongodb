import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthenticationService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { SECRET_KEY } from './constants';
import { authProviders } from './auth.providers';
import { JwtStrategy } from './jwt.strategy';
import { AuthenticationController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    ...authProviders,
  ],
})
export class AuthModule {}
