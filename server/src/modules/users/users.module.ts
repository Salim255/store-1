import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
})
export class UsersModule {}
