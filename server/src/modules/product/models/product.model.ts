import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schema/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/product.dto';

@Injectable()
export class ProductModel {
  logger = new Logger('Product Model');
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(data: CreateProductDto): Promise<Product> {
    this.logger.log(data);
    const createdProduct = new this.productModel(data).save();
    return createdProduct;
  }

  async findAll() {}

  async findById() {}

  async delete() {}

  async update() {}
}
