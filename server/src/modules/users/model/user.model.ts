import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';

export class UserModel {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(data: any): Promise<User> {
    const createdUser = new this.userModel(data).save();
    return createdUser;
  }

  async findAll() {}

  async findById() {}

  async update() {}

  async delete() {}
}
