import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserModel } from './model/user.model';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    // At this point, NestJS uses Mongoose to create a model called 'Product'.
    // Based on document name, and schema
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UserModel, UsersService],
})
export class UsersModule {}
