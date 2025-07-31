import { ApiProperty } from '@nestjs/swagger';

export const userObjectExample = {
  _id: '123IZN',
  firstName: 'Salim',
  lastName: 'Hassan',
  email: 'test@gmail.com',
  password: '123',
  passwordConfirm: '123',
  isEmailVerified: false,
  isActive: true,
  role: 'customer',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export class CreateUserDto {
  @ApiProperty({ description: `User's firstName`, example: 'Salim' })
  firstName: string;

  @ApiProperty({ description: `User's lastName` })
  lastName: string;

  @ApiProperty({ description: `User's email`, example: 'test@gmail.com' })
  email: string;

  @ApiProperty({ description: `User's password` })
  password: string;

  @ApiProperty({ description: `User's confirm password` })
  passwordConfirm: string;
}
export class CreatedUserResponseDto {
  @ApiProperty({ description: 'Create user status', example: 'Success' })
  status: string;

  @ApiProperty({
    description: 'Create user response',
    example: {
      user: userObjectExample,
    },
  })
  data: {
    user: CreateUserDto;
  };
}
