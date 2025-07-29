import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../schema/product.schema';

export const ProductExampleDto = {
  _id: '6888cdb8e8dcbe8b27576971',
  name: 'Wireless Mouse',
  description: 'A lightweight ergonomic wireless mouse',
  isActive: true,
  isDeleted: false,
  tags: [],
  totalReviews: 0,
  averageRating: 0,
  variants: [],
  createdAt: '2025-07-29T13:33:44.225+00:00',
  updatedAt: '2025-07-29T13:33:44.225+00:00',
};

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Wireless Mouse',
  })
  name: string;

  @ApiProperty({
    description: 'Price of the product in USD',
    example: 29.99,
  })
  price: number;

  @ApiProperty({
    description: 'Detailed description of the product',
    example: 'A lightweight ergonomic wireless mouse',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Product category',
    example: 'Electronics',
    required: false,
  })
  category?: string;

  @ApiProperty({
    description: 'Availability status',
    example: true,
    required: false,
  })
  inStock?: boolean;
}

export class CreateProductResponseDto {
  @ApiProperty({
    description: 'Create Product response status',
    example: 'Success',
  })
  status: string;

  @ApiProperty({
    description: 'Created product details',
    type: Object,
    example: {
      product: ProductExampleDto,
    },
  })
  data: {
    product: Product;
  };
}
