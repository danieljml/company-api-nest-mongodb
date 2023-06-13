import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { usersProviders } from './users.providers';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
	exports: [...usersProviders],
})
export class UsersModule {}
