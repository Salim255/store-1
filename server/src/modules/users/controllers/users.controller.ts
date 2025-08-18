import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreatedUserResponseDto,
  CreateUserDto,
  SigninUserDto,
  SigninUserResponseDto,
} from '../dto/users.dto';
import { UsersService } from '../services/users.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { cookieOption } from 'src/config/cookie-options.config';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly configService: ConfigService,
    private usersService: UsersService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Register a new user response',
    type: CreatedUserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request validation failed',
  })
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ): Promise<Response> {
    const createUser: CreatedUserResponseDto =
      await this.usersService.signup(createUserDto);

    const NODE_ENV = this.configService.get<string>('NODE_ENV');

    // Cookie expiration value
    const JWT_COOKIE_EXPIRE_IN = parseInt(
      this.configService.get<string>('JWT_COOKIE_EXPIRE_IN') || '90',
      10, // Base
    );

    // Built cookie options
    const cookieOptions = cookieOption(JWT_COOKIE_EXPIRE_IN);

    // Set secure based on NODE_ENV
    if (NODE_ENV === 'production') cookieOptions.secure = true;

    response.cookie('jwt', createUser.token, cookieOptions);

    // Remove the password from the output
    createUser.data.user.password = undefined;

    return response.status(200).json(createUser);
  }

  @Post('/sign-in')
  @ApiOperation({ summary: 'Signin a user' })
  @ApiBody({
    type: SigninUserDto,
  })
  @ApiResponse({
    status: 200,
    description: 'SignIn user response',
    type: SigninUserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request validation failed',
  })
  async signIn(
    @Body() signinUserDto: SigninUserDto,
    @Res() response: Response,
  ): Promise<Response> {
    const data: SigninUserResponseDto =
      await this.usersService.signIn(signinUserDto);

    const NODE_ENV = this.configService.get<string>('NODE_ENV');

    // Cookie expiration value
    const JWT_COOKIE_EXPIRE_IN = parseInt(
      this.configService.get<string>('JWT_COOKIE_EXPIRE_IN') || '90',
      10, // Base
    );
    // Built cookie options
    const cookieOptions = cookieOption(JWT_COOKIE_EXPIRE_IN);

    // Set secure based on NODE_ENV
    if (NODE_ENV === 'production') cookieOptions.secure = true;

    response.cookie('jwt', data.token, cookieOptions);
    console.log(data.user);
    return response.status(200).json({
      status: 'success',
      data: {
        user: data.user,
      },
    });
  }
}
