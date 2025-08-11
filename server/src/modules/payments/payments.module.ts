import { Module } from '@nestjs/common';
import { PaymentsController } from './controllers/payments.controller';
import { ProductsModule } from '../product/product.module';

@Module({
  imports: [ProductsModule],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
