import {
  Body,
  Controller,
  HttpCode,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthJwtGuard } from 'src/modules/auth/auth-jwt.guard';
import Stripe from 'stripe';
import { Request } from 'express';
import {
  CreateCheckoutSession,
  CreatedSessionResponse,
} from '../dto/payments.dto';
import { PaymentsService } from '../services/payments.service';

export interface AuthenticatedRequest extends Request {
  user: { id: string; email: string };
}

@ApiCookieAuth()
@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  private logger = new Logger('Payment Controller');
  private stripe: Stripe;
  constructor(private paymentsService: PaymentsService) {}

  // checkout-session
  @Post()
  @UseGuards(AuthJwtGuard)
  @ApiOperation({ summary: 'Create checkout session' })
  @ApiBody({ type: CreateCheckoutSession })
  async getCheckoutSession(
    @Body() body: CreateCheckoutSession,
    @Req() req: AuthenticatedRequest,
  ): Promise<CreatedSessionResponse> {
    const client_secret: string | null =
      await this.paymentsService.createCheckoutSession(body, req);
    // 3) Send it to the client as response
    return {
      status: 'success',
      data: {
        client_secret: client_secret,
      },
    };
  }

  // Webhook endpoint
  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    this.paymentsService.createOrderFromCheckout(req);
    await res.json();
  }
}
