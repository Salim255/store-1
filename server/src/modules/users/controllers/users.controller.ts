import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createdUserResponseDto, createUserDto } from '../dto/users.dto';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@Controller('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: createUserDto,
  })
  @ApiResponse({
    status: 200,
    description: '',
    type: createdUserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request validation failed',
  })
  async createUser() {
    const createUser = await this.usersService.signup();
    return createUser;
  }
}
