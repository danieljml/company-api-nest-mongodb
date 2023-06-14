import { Response } from 'express';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { User } from './users.model';
import { MatchUserGuard } from '../auth/match-user.guard';
import { Public } from '../auth/auth.custom-decorators';
import * as fs from 'fs';

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

  @UseGuards(MatchUserGuard)
  @Post(':id/profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(
    @Param('id') id: string,
    @UploadedFile() file: any,
  ) {
    const destination = './uploads';
    const fileName = `${id}_profile.jpg`;
    const filePath = `${destination}/${fileName}`;
    fs.writeFileSync(filePath, file.buffer);
    const user = new User();
    user.profilePicture = filePath;
    return this.usersService.update(id, user);
  }

  @Public()
  @Get('profile-picture/:filename')
  async serveProfilePicture(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    return res.sendFile(filename, { root: './uploads' });
  }

  @Delete()
  async deleteAll(): Promise<number> {
    return this.usersService.deleteAll();
  }
}
