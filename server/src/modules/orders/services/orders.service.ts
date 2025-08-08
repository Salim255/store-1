import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from '../dto/orders.dto';
import { OrderModel } from '../model/order.model';
import { Order } from '../schema/order.schema';
import { UserModel } from 'src/modules/users/model/user.model';

@Injectable()
export class OrdersService {
  logger = new Logger('Products Service ✅');
  constructor(
    private userModel: UserModel,
    private readonly orderModel: OrderModel,
  ) {}

  async createOrder(data: CreateOrderDto): Promise<Order> {
    console.log(data.user);
    const userExists = await this.userModel.exist(data.user);
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
}
