import { Injectable } from '@nestjs/common';
import { UserModel } from '../model/user.model';

@Injectable()
export class UsersService {
  constructor(private userModel: UserModel) {}

  async signup() {
    const createdUser = await this.userModel.create({ firstName: 'Salim' });
    return createdUser;
  }
}
