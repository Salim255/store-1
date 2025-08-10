import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from '../schema/product.schema';
import {
  CreateProductDto,
  CreateProductResponseDto,
  GetALLProductsDto,
  ProductFilterDto,
} from '../dto/product.dto';
import { ProductsService } from '../services/products.service';
import { Request } from 'express';
import { ApiMetaData } from 'utils/api-features';
import { AuthJwtGuard } from 'src/modules/auth/auth-jwt.guard';

@ApiCookieAuth()
@ApiTags('Products')
@Controller('products') // Base root : /products
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // POST /products
  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 200,
    description: 'Product created successfully',
    type: CreateProductResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request validation field',
  })
  @ApiBody({ type: CreateProductDto })
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<CreateProductResponseDto> {
    const createdProduct: Product =
      await this.productsService.createProduct(createProductDto);
    return {
      status: 'Success',
      data: {
        product: createdProduct,
      },
    };
  }

  // GET /products
  @UseGuards(AuthJwtGuard)
  @Get(['', 'featured-products'])
  async getAllProducts(
    @Query() filters: ProductFilterDto,
  ): Promise<GetALLProductsDto> {
    const data: { products: Product[]; meta: ApiMetaData } =
      await this.productsService.getAllProducts(filters);
    return {
      status: 'Success',
      data: {
        products: data.products,
      },
      meta: data.meta,
    };
  }

  // GET /products/:1
  @Get('/:productId')
  async getProductById() {}

  // PATCH /products/:1
  @Patch()
  async updateProduct() {}

  @Delete('/:productId')
  async removeProduct() {}
}
