import { Injectable, Logger } from '@nestjs/common';
import { UserModel } from '../model/user.model';
import { CreateUserDto } from '../dto/users.dto';
import { User } from '../schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  logger = new Logger();
  constructor(
    private userModel: UserModel,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    // Data sanitization
    const { lastName, firstName, email, password, passwordConfirm } =
      createUserDto;
    const createdUser = await this.userModel.create({
      lastName,
      firstName,
      email,
      password,
      passwordConfirm,
    });

    const newUser = createdUser;
    // JWT
    // 1) Build the payload, _id and the secret
    const payload = { _id: newUser._id };
    const token = await this.jwtService.signAsync(payload);
    this.logger.log(token);
    return createdUser;
  }
}
