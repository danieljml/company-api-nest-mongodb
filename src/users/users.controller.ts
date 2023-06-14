import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import { MatchUserGuard } from '../auth/match-user.guard';
import { Public } from '../auth/auth.custom-decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(MatchUserGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.usersService.update(id, user);
  }

  @Delete()
  async deleteAll(): Promise<number> {
    return this.usersService.deleteAll();
  }
}
