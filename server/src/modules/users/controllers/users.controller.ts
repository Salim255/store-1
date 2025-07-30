import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createdUserResponseDto, createUserDto } from '../dto/users.dto';

@ApiTags('Users')
@Controller('Users')
export class UsersController {
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
  async createUser(): Promise<createdUserResponseDto> {
    return new Promise(() => {});
  }
}
