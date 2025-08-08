import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from '../dto/users.dto';

export class UserModel {
  constructor(
    // @InjectModel(...)	NestJS decorator to inject a Mongoose model
    // Product.name	Equivalent to 'Product', the name of the model (from the class name)
    // Model<Product>	Mongoose model type for strong typing in TypeScript
    // private readonly userModel	Class property to hold the injected model
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(data).save();
    return createdUser;
  }

  async findAll() {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).select('+password');
    return user;
  }

  async exist(_id: Types.ObjectId): Promise<boolean> {
    const user = await this.userModel.findById(_id);
    return user ? true : false;
  }

  async update() {}

  async delete() {}
}
