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
    const createdProduct = new this.productModel(data).save();
    return createdProduct;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    //.find() retrieves all documents in the collection.
    //.exec() turns it into a real Promise (recommended for consistency).
    return products;
  }

  async findById() {}

  async delete() {}

  async update() {}
}
