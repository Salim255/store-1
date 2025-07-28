import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schema/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductModel {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create() {}

  async findAll() {}

  async findById() {}

  async delete() {}

  async update() {}
}
