import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { usersProviders } from './users.providers';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from '../auth/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [...usersProviders, UsersService],
})
export class UsersModule {}
