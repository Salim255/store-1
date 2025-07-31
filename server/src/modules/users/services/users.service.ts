import { Injectable, Logger } from '@nestjs/common';
import { UserModel } from '../model/user.model';
import {
  CreatedUserResponseDto,
  CreateUserDto,
  SigninUserDto,
  SigninUserResponseDto,
} from '../dto/users.dto';
import { User } from '../schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  logger = new Logger();
  constructor(
    private userModel: UserModel,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<CreatedUserResponseDto> {
    // Data sanitization
    const { lastName, firstName, email, password, passwordConfirm } =
      createUserDto;
    const createdUser: User = await this.userModel.create({
      lastName,
      firstName,
      email,
      password,
      passwordConfirm,
    });

    const newUser = createdUser;
    // JWT
    // 1) Build the payload, _id and the secret
    const payload = { id: newUser._id };

    // Generate token
    const token = await this.jwtService.signAsync(payload);

    return {
      status: 'Success',
      token,
      data: { user: newUser },
    };
  }

  async signIn(signinUserDto: SigninUserDto): Promise<SigninUserResponseDto> {
    const { email, password } = signinUserDto;
    // Get user with the given email
    const findUser = await this.userModel.findByEmail(email);
    if (!findUser) throw new Error();

    // Verify passwords
    const storedPassword = findUser.password;
    const comingPassword = password;
    const correct: boolean = await bcrypt.compare(
      comingPassword,
      storedPassword,
    );

    if (!correct) {
      throw new Error();
    }
    // Prepare user data to return as response
    const payload = { id: findUser._id };

    // Generate token
    const token = await this.jwtService.signAsync(payload);
    return {
      status: 'Success',
      token,
      data: {
        user: findUser,
      },
    };
  }
}
