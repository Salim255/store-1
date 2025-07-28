import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/product.dto';
import { ProductModel } from '../models/product.model';

@Injectable()
export class ProductService {
  constructor(private readonly productModel: ProductModel) {}

  createProduct(data: CreateProductDto) {
    console.log(data);
    return true;
  }
}
