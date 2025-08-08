import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { OrderModel } from './model/order.model';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderModel],
})
export class OrderModule {}
