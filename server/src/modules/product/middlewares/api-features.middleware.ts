import { Document, Query } from 'mongoose';
import { ProductFilterDto } from '../dto/product.dto';
export class APIFeatures<T extends Document> {
  query: Query<T[], T>;
  queryString: ProductFilterDto;
  constructor(query: Query<T[], T>, queryString: ProductFilterDto) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //  BUILD THE QUERY
    const queryObject: ProductFilterDto = {};
    if (typeof this.queryString.price === 'string') {
      queryObject.price = this.queryString.price;
    } else if (typeof this.queryString['price[gte]'] === 'string') {
      queryObject.price = {};
      queryObject.price.$gte = this.queryString['price[gte]'];
      //console.log(queyObject);
    } else if (typeof this.queryString['price[gt]'] === 'string') {
      queryObject.price = {};
      queryObject.price.$gt = this.queryString['price[gt]'];
    } else if (typeof this.queryString['price[lte]'] === 'string') {
      queryObject.price = {};
      queryObject.price.$lte = this.queryString['price[lte]'];
    } else if (typeof this.queryString['price[lt]'] === 'string') {
      queryObject.price = {};
      queryObject.price.$lt = this.queryString['price[lt]'];
    }
    if (this.queryString.category?.trim().length) {
      queryObject.category = this.queryString.category.trim();
    }
    if (this.queryString.company?.trim().length) {
      queryObject.company = this.queryString.company.trim();
    }

    // FEATURED Products
    if (this.queryString.featured?.trim().length) {
      queryObject.featured = this.queryString.featured;
    }

    // SEARCH PRODUCT
    const searchQuery: { $text?: { $search: string } } = {};
    if (this.queryString.search?.trim()) {
      searchQuery.$text = { $search: this.queryString.search.trim() };
    }
    //  Filter first without await, so latter we can add sorting and pagination
    // {price: {$gte: 5}}
    //let query = this.productModel.find({ ...searchQuery, ...queryObject });
    this.query.find({ ...searchQuery, ...queryObject });
    return this;
  }
}
