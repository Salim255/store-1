import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { Product, ProductSchema } from './schema/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/product.controller';
import { ProductModel } from './model/product.model';
import { FeaturedProductsMiddleware } from './middlewares/featured-products.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductModel],
  exports: [ProductModel],
})
export class ProductsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FeaturedProductsMiddleware).forRoutes({
      path: 'products/featured-products',
      method: RequestMethod.GET,
    });
  }
}
