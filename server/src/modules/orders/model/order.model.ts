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

  async findAll() {
    const orders = await this.orderModel.find();
    return orders;
  }

  async findById() {}

  async update() {}

  async delete() {}
}
