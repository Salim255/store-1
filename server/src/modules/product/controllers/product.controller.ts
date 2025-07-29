import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from '../schema/product.schema';
import {
  CreateProductDto,
  CreateProductResponseDto,
  GetALLProductsDto,
} from '../dto/product.dto';
import { ProductsService } from '../services/products.service';

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
  @Get()
  async getAllProducts(): Promise<GetALLProductsDto> {
    const products: Product[] = await this.productsService.getAllProducts();
    return {
      status: 'Success',
      data: {
        products,
      },
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
