import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async update(id: string, user: User): Promise<User> {
    delete user.password;
    delete user.username;
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async deleteAll(): Promise<number> {
    const result = await this.userModel.deleteMany({});
    return result.deletedCount;
  }
}
