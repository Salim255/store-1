import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Order } from '../schema/order.schema';
import {
  CreateOrderDto,
  CreateOrderResponseDto,
  GetALLOrdersDto,
} from '../dto/orders.dto';
import { OrdersService } from '../services/orders.service';
import { AuthJwtGuard } from 'src/modules/auth/auth-jwt.guard';

@ApiTags('Orders')
@Controller('orders') // Base root : /orders
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  // POST /orders
  @Post()
  @UseGuards(AuthJwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 200,
    description: 'Order created successfully',
    type: CreateOrderResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request validation field',
  })
  @ApiBody({ type: CreateOrderDto })
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderResponseDto> {
    try {
      const createdOrder: Order =
        await this.ordersService.createOrder(createOrderDto);
      return {
        status: 'Success',
        data: {
          product: createdOrder,
        },
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'unknown error';
      if (errorMessage === 'Invalid user ID') {
        throw new BadRequestException(errorMessage);
      }

      throw new InternalServerErrorException('An unexpected error occurred.');
    }
  }

  // GET /orders
  @Get()
  async getAllOrders(): Promise<GetALLOrdersDto> {
    const orders: Order[] = await this.ordersService.getAllOrders();
    return {
      status: 'Success',
      data: {
        orders: orders,
      },
    };
  }

  // GET /orders/:1
  @Get('/:orderId')
  async getOrderById() {}

  // PATCH /orders/:1
  @Patch()
  async updateOrder() {}

  @Delete('/:orderId')
  async removeOrder() {}
}
