import { Injectable } from '@nestjs/common';
import { UserModel } from '../model/user.model';
import { CreateUserDto } from '../dto/users.dto';
import { User } from '../schema/user.schema';

@Injectable()
export class UsersService {
  constructor(private userModel: UserModel) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }
}
