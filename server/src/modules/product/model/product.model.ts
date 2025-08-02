import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schema/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto, ProductFilterDto } from '../dto/product.dto';

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
    //  BUILD THE QUERY
    const queyObject: ProductFilterDto = {};
    if (typeof filters.price === 'string') {
      queyObject.price = filters.price;
    } else if (typeof filters['price[gte]'] === 'string') {
      queyObject.price = {};
      queyObject.price.$gte = filters['price[gte]'];
      //console.log(queyObject);
    } else if (typeof filters['price[gt]'] === 'string') {
      queyObject.price = {};
      queyObject.price.$gt = filters['price[gt]'];
    } else if (typeof filters['price[lte]'] === 'string') {
      queyObject.price = {};
      queyObject.price.$lte = filters['price[lte]'];
    } else if (typeof filters['price[lt]'] === 'string') {
      queyObject.price = {};
      queyObject.price.$lt = filters['price[lt]'];
    }
    if (filters.category) {
      queyObject.category = filters.category;
    }
    if (filters.company) {
      queyObject.company = filters.company;
    }

    // FEATURED Products
    if (filters.featured) {
      queyObject.featured = filters.featured;
    }

    //  Filter first without await, so latter we can add sorting and pagination
    // {price: {$gte: 5}}
    let query = this.productModel.find(queyObject);
    //  const query =  this.productModel.find({ price: 15099 }).exec(); */ // Filtering using Object query//
    //  const { price, company, category, name } = req.query;
    //  const excludeFields = ['sort', 'page', 'limit', 'fields'];
    //  excludeFields.forEach((el) => delete queryObj[el]);

    // SORTING BY
    // api/v1/products?sort=-price
    // api/v1/products?sort=price
    // api/v1/products?sort=price,rating
    if (filters.sort) {
      const sortString = filters.sort.split(',').join(' ');
      query = query.sort(sortString);
      // sort(price) or sort(price rating)
    } else {
      // To get the last one been created
      //query = query.sort('createdAt');
    }

    // FIELD LIMITING
    /*  if (filters.fields) {
      const fieldsString = filters.fields.split(',').join(' ');
      query = query.select(fieldsString);
    } */
    //query = query.select('-__v');

    // SORTING Alphabetic a-z or z-a
    if (filters.name) {
      query = query.sort({ name: filters.name === 'a-z' ? 1 : -1 });
    }

    // Pagination
    // {{URL}}api/v1/products?page=2&limit=4
    // This means 4 result by page, and skip means skip the the first page, then give me pages from second page every page has 4 result
    // 1- 4 for page1, and 4-8 are for page 2, and 8 -12 are for page 3
    const page = filters.page * 1 || 1;
    const limit = filters.limit * 1 || 4;

    // So this number here is all the results come before the request that we are requesting now
    const skip = (page - 1) * limit; // page -1 means the previous page
    query = query.skip(skip).limit(limit);

    // Avoid empty page
    if (filters.page) {
      const countProducts = await this.productModel.countDocuments();
      if (skip >= countProducts) {
        throw new NotFoundException('This page does not exist');
      }
    }

    //  EXECUTE THE QUERY
    const products = await query.exec(); // Filtering using  Mongoose methods
    //  find() retrieves all documents in the collection.
    //  exec() turns it into a real Promise (recommended for consistency).

    // SEND RESPONSE
    return products;
  }

  async findById() {}

  async delete() {}

  async update() {}
}
