import { Document, ObjectId, Query } from 'mongoose';
import { ProductFilterDto } from '../src/modules/product/dto/product.dto';

interface CategoryCompany {
  _id: ObjectId;
  company: string;
  category: string;
}

export interface ApiMetaData {
  pagination: { pageSize: number; pageCount: number; total: number };
  categories: string[];
  companies: string[];
}

export class APIFeatures<T extends Document> {
  query: Query<T[], T>;
  queryString: ProductFilterDto;
  constructor(query: Query<T[], T>, queryString: ProductFilterDto) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //  BUILD THE QUERY
    // api/v1/products?price[gte]=150
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

    //  Filter first without await, so latter we can add sorting and pagination
    this.query = this.query.find(queryObject);
    return this;
  }

  featuredProduct() {
    const queryObject: ProductFilterDto = {};
    // FEATURED Products
    if (this.queryString.featured?.trim().length) {
      queryObject.featured = this.queryString.featured;
    }
    this.query.find(queryObject);
    return this;
  }

  search() {
    // SEARCH PRODUCT
    const searchQuery: { $text?: { $search: string } } = {};
    if (this.queryString.search?.trim()) {
      searchQuery.$text = { $search: this.queryString.search.trim() };
    }
    this.query.find(searchQuery);
    return this;
  }

  sort() {
    // api/v1/products?sort=-price
    // api/v1/products?sort=price
    // api/v1/products?sort=price,rating
    // api/v1/products?alphaSort='a-z'
    if (this.queryString.alphaSort?.trim().length) {
      this.query.sort({
        name: this.queryString.alphaSort.trim() === 'a-z' ? 1 : -1,
      });
    }
    if (this.queryString.sort) {
      const sortString = this.queryString.sort.split(',').join(' ');
      this.query.sort(sortString);
    } else {
      // To get the last one been created
      this.query.sort('-createdAt'); // or this.query.sort('createdAt')
    }
    return this;
  }

  paginate() {
    // Pagination
    // {{URL}}api/v1/products?page=2&limit=4
    // This means 4 result by page, and skip means skip the the first page, then give me pages from second page every page has 4 result
    // 1- 4 for page1, and 4-8 are for page 2, and 8 -12 are for page 3
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 4;

    // So this number here is all the results come before the request that we are requesting now
    const skip = (page - 1) * limit; // page -1 means the previous page
    this.query.skip(skip).limit(limit);
    return this;
  }

  async buildApiMeta(): Promise<ApiMetaData> {
    const pageSize = this.queryString.limit * 1 || 4;
    const total = await this.query.clone().countDocuments();
    const pageCount = Math.ceil(total / pageSize);

    // Get all categories and companies from the full database (not filtered)
    const rawAllProducts = await this.query.model.find<CategoryCompany>(
      {},
      'category company',
    ); //Use lean() for plain objects.

    const categoriesSet = new Set(rawAllProducts.map((p) => p.category));
    const companiesSet = new Set(rawAllProducts.map((p) => p.company));

    const categories = ['all', ...Array.from(categoriesSet)];
    const companies = ['all', ...Array.from(companiesSet)];

    return {
      pagination: { pageSize, pageCount, total },
      categories,
      companies,
    };
  }
}
