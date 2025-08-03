import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schema/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto, ProductFilterDto } from '../dto/product.dto';
import { APIFeatures } from '../../../../utils/api-features';

@Injectable()
export class ProductModel {
  logger = new Logger('Product Model');
  constructor(
    // @InjectModel(...)	NestJS decorator to inject a Mongoose model
    // Product.name	Equivalent to 'Product', the name of the model (from the class name)
    // Model<Product>	Mongoose model type for strong typing in TypeScript
    // private readonly productModel	Class property to hold the injected model
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(data: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(data).save();
    return createdProduct;
  }

  async findAll(filters: ProductFilterDto): Promise<Product[]> {
    try {
      console.log(filters);
      // Pagination
      // {{URL}}api/v1/products?page=2&limit=4
      // This means 4 result by page, and skip means skip the the first page, then give me pages from second page every page has 4 result
      // 1- 4 for page1, and 4-8 are for page 2, and 8 -12 are for page 3
      // const page = filters.page * 1 || 1;
      // const limit = filters.limit * 1 || 4;

      // So this number here is all the results come before the request that we are requesting now
      // const skip = (page - 1) * limit; // page -1 means the previous page
      // query = query.skip(skip).limit(limit);

      // Avoid empty page
      /*    if (filters.page) {
        const countProducts = await this.productModel.countDocuments();
        if (skip >= countProducts) {
          throw new NotFoundException('This page does not exist');
        }
      } */

      //  EXECUTE THE QUERY
      const features = new APIFeatures(this.productModel.find(), filters)
        .filter()
        .sort()
        .featuredProduct()
        .paginate();

      const products: Product[] = await features.query.exec();
      // const products = await query.exec(); // Filtering using  Mongoose methods
      //  find() retrieves all documents in the collection.
      //  exec() turns it into a real Promise (recommended for consistency).

      // SEND RESPONSE
      return products;
    } catch (error) {
      console.log(error);
      // generic message—don't leak which part failed
      if (error instanceof Error) {
        // Re-throw known errors without modification
        throw error;
      }

      // Handle unexpected/internal errors with a generic response
      throw new InternalServerErrorException(
        'Something went wrong while fetching products.',
      );
    }
  }

  async findById() {}

  async delete() {}

  async update() {}
}
