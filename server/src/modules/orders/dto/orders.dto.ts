import { ApiProperty } from '@nestjs/swagger';
import { OrderItems } from '../schema/order.schema';

export class CreateOrderDto {
  @ApiProperty()
  taxPrice: number;

  @ApiProperty()
  shippingPrice: number;

  @ApiProperty()
  paymentMethod: 'paypal' | 'credit_card';

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  itemsPrice: number;

  @ApiProperty()
  user: string;

  @ApiProperty()
  items: OrderItems[];

  @ApiProperty()
  shippingAddress: {
    fullName: string;
    phone: string;
    postalCode: string;
    country: string;
    city: string;
    address: string;
  };
}
export class CreateOrderResponseDto {}
export class GetALLOrdersDto {}
export class OrdersFilterDto {}
