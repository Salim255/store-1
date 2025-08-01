import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto, ProductFilterDto } from '../dto/product.dto';
import { ProductModel } from '../model/product.model';
import { Product } from '../schema/product.schema';
import { Request } from 'express';

@Injectable()
export class ProductsService {
  logger = new Logger('Products Service ✅');
  constructor(private readonly productModel: ProductModel) {}

  async createProduct(data: CreateProductDto): Promise<Product> {
    const createdProduct: Product = await this.productModel.create(data);
    return createdProduct;
  }

  async getAllProducts(filters: ProductFilterDto): Promise<Product[]> {
    //console.log(filters);
    const products: Product[] = await this.productModel.findAll(filters);
    return products;
  }
}
