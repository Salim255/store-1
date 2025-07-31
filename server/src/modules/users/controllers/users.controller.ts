import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatedUserResponseDto, CreateUserDto } from '../dto/users.dto';
import { UsersService } from '../services/users.service';
import { User } from '../schema/user.schema';

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
    const createUser: User = await this.usersService.signup(createUserDto);
    return {
      status: 'Success',
      data: { user: createUser },
    };
  }
}
