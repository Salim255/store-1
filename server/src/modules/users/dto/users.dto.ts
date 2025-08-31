import { ApiProperty, OmitType } from '@nestjs/swagger';

export const userObjectExample = {
  _id: '123IZN',
  firstName: 'Salim',
  lastName: 'Hassan',
  email: 'test@gmail.com',
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

export class CreatedUserDto extends OmitType(CreateUserDto, [
  'passwordConfirm',
  'password',
]) {
  @ApiProperty({ description: `User's firstName`, example: 'Salim' })
  firstName: string;

  @ApiProperty({ description: `User's lastName` })
  lastName: string;

  @ApiProperty({ description: `User's email`, example: 'test@gmail.com' })
  email: string;

  @ApiProperty({ description: `User's password` })
  password?: string;

  @ApiProperty({ description: 'User created at', example: new Date() })
  createdAt: Date;

  @ApiProperty({ description: 'User updated at', example: new Date() })
  updatedAt: Date;
}

export class CreatedUserResponseDto {
  @ApiProperty({ description: 'Create user status', example: 'Success' })
  status: string;
  @ApiProperty({
    description: 'User login token',
    example: 'user token',
  })
  token: string;

  @ApiProperty({
    description: 'Create user response',
    example: {
      user: userObjectExample,
    },
  })
  data: {
    user: CreatedUserDto;
  };
}

export class SigninUserDto {
  @ApiProperty({ description: 'User email', example: 'test@gmail.com' })
  email: string;

  @ApiProperty({ description: 'User password', example: 'password' })
  password: string;
}

export class SigninUserResponseDto {
  token: string;
  user: CreatedUserDto;
}
