import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreatedUserResponseDto,
  CreateUserDto,
  SigninUserDto,
  SigninUserResponseDto,
} from '../dto/users.dto';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
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
  ): Promise<CreatedUserResponseDto> {
    const createUser: CreatedUserResponseDto =
      await this.usersService.signup(createUserDto);
    return createUser;
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
  ): Promise<SigninUserResponseDto> {
    const createUser: SigninUserResponseDto =
      await this.usersService.signIn(signinUserDto);
    return createUser;
  }
}
