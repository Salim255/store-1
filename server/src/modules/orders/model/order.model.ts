import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schema/order.schema';
import { CreateOrderDto } from '../dto/orders.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderModel {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async create(data: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(data).save();
    return createdOrder;
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderModel
      .find()
      .populate('items.productId', 'name price images description')
      .exec();
    return orders;
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const orders = await this.orderModel
      .find({ user: userId })
      .populate('items.productId', 'name price images description')
      .exec();
    return orders;
  }

  async update() {}

  async delete() {}
}
