import { Module } from '@nestjs/common';
import { Product, ProductSchema } from './schema/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './services/product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
    ProductService,
  ],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
