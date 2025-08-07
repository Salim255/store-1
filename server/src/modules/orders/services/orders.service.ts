import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from '../dto/orders.dto';
import { OrderModel } from '../model/order.model';
import { Order } from '../schema/order.schema';

@Injectable()
export class OrdersService {
  logger = new Logger('Products Service ✅');
  constructor(private readonly orderModel: OrderModel) {}

  async createOrder(data: CreateOrderDto): Promise<Order> {
    const createdOrder: Order = await this.orderModel.create(data);
    return createdOrder;
  }

  async getAllOrders(): Promise<Order[]> {
    const orders: Order[] = await this.orderModel.findAll();
    return orders;
  }
}
