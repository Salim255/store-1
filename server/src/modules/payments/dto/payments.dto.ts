import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class ShippingAddress {
  @ApiProperty({ description: 'Shipping country', example: 'France' })
  country: string;

  @ApiProperty({ description: 'Customer full name', example: 'Adam' })
  fullName: string;

  @ApiProperty({ description: 'Shipping city', example: 'Paris' })
  city: string;

  @ApiProperty({ description: 'Shipping postal code', example: '7500' })
  postalCode: string;

  @ApiProperty({
    description: 'Shipping phone number',
    example: '+337652667890',
  })
  phone: string;

  @ApiProperty({ description: 'Shipping address', example: '2 Bis rue du roi' })
  address: string;
}

// Create-Session-Checkout
export class CreateCheckoutSession {
  @ApiProperty({
    description: 'Items of productId and product quantity',
    example: {
      productId: '1231312',
      quantity: 3,
    },
  })
  @IsNotEmpty()
  items: {
    productId: string;
    quantity: number;
  }[];

  @ApiProperty({ description: 'Shipping address of the Order' })
  @IsNotEmpty()
  @ValidateNested()
  shippingAddress: ShippingAddress;
}

export class CreatedSessionResponse {
  status: 'success';
  data: {
    client_secret: string | null;
  };
}
