import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthJwtGuard } from 'src/modules/auth/auth-jwt.guard';
import Stripe from 'stripe';
import { Request } from 'express';
import {
  CreateCheckoutSession,
  CreatedSessionResponse,
} from '../dto/payments.dto';
import { PaymentsService } from '../services/payments.service';

@ApiCookieAuth()
@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  private stripe: Stripe;
  constructor(private paymentsService: PaymentsService) {}

  // checkout-session
  @Post()
  @UseGuards(AuthJwtGuard)
  @ApiOperation({ summary: 'Create checkout session' })
  @ApiBody({ type: CreateCheckoutSession })
  async getCheckoutSession(
    @Body() body: CreateCheckoutSession,
    @Req() req: Request,
  ): Promise<CreatedSessionResponse> {
    const session: Stripe.Response<Stripe.Checkout.Session> =
      await this.paymentsService.createCheckoutSession(body, req);
    // 3) Send it to the client as response
    return {
      status: 'success',
      data: {
        session,
      },
    };
  }
}
