import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
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
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: { id: string; email?: string }; // whatever fields your JWT adds
}

@ApiCookieAuth()
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
  @UseGuards(AuthJwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'Orders retrieved successfully',
    type: GetALLOrdersDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request validation field',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getAllOrders(): Promise<GetALLOrdersDto> {
    const orders: Order[] = await this.ordersService.getAllOrders();
    return {
      status: 'Success',
      data: {
        orders: orders,
      },
    };
  }

  // Get /orders/users/:userId
  @Get('users')
  @UseGuards(AuthJwtGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get orders by user ID' })
  @ApiResponse({
    status: 200,
    description: 'Orders retrieved successfully',
    type: GetALLOrdersDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request validation field',
  })
  async getOrdersByUserId(@Req() req: AuthRequest): Promise<GetALLOrdersDto> {
    const userId = req.user.id; // Extract user ID from request object
    // Assuming user ID is stored in the request object
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    const orders: Order[] = await this.ordersService.getOrdersByUserId(userId);
    return {
      status: 'Success',
      data: {
        orders: orders,
      },
    };
  }

  // GET /orders/users/:1
  @Get('/:orderId')
  async getOrderById() {}

  // PATCH /orders/:1
  @Patch()
  async updateOrder() {}

  @Delete('/:orderId')
  async removeOrder() {}
}
