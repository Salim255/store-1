import { Module } from '@nestjs/common';
import { PaymentsController } from './controllers/payments.controller';
import { ProductsModule } from '../product/product.module';
import { PaymentsService } from './services/payments.service';

@Module({
  imports: [ProductsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
