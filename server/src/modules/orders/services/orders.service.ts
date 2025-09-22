import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from '../dto/orders.dto';
import { OrderModel } from '../model/order.model';
import { Order } from '../schema/order.schema';
import { UserModel } from 'src/modules/users/model/user.model';
import { Types } from 'mongoose';

@Injectable()
export class OrdersService {
  logger = new Logger('Products Service ✅');
  constructor(
    private userModel: UserModel,
    private readonly orderModel: OrderModel,
  ) {}

  async createOrder(data: CreateOrderDto): Promise<Order> {
    const userId = new Types.ObjectId(data.user);
    const userExists = await this.userModel.exist(userId);
    if (!userExists) {
      throw new Error('Invalid user ID');
    }
    const createdOrder: Order = await this.orderModel.create(data);
    return createdOrder;
  }

  async getAllOrders(): Promise<Order[]> {
    const orders: Order[] = await this.orderModel.findAll();
    return orders;
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    const orders: Order[] = await this.orderModel.findByUserId(userId);
    return orders;
  }
}
