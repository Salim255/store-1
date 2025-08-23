import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
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
    const payload = { id: newUser._id, email: newUser.email };

    // Generate token
    const token = await this.jwtService.signAsync(payload);

    //// Cookies
    return {
      status: 'Success',
      token,
      data: { user: newUser },
    };
  }

  async signIn(signinUserDto: SigninUserDto): Promise<SigninUserResponseDto> {
    const { email, password: comingPassword } = signinUserDto;
    // Check if email and password exist
    if (!email?.trim() || !comingPassword) {
      throw new UnauthorizedException('Email and password are required');
    }
    // Get user with the given email
    const findUser = await this.userModel.findByEmail(email);

    // Verify passwords
    if (
      !findUser ||
      !(await bcrypt.compare(comingPassword, findUser.password))
    ) {
      // generic message—don't leak which part failed
      throw new UnauthorizedException('Invalid email or password');
    }

    // Prepare user data to return as response
    const payload = { id: findUser._id, email: findUser.email };

    // Generate token
    const token = await this.jwtService.signAsync(payload);

    return { token, user: findUser };
  }
}
