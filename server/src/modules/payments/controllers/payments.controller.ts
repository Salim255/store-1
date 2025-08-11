import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { AuthJwtGuard } from 'src/modules/auth/auth-jwt.guard';
import { ProductModel } from 'src/modules/product/model/product.model';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Request } from 'express';
import { CreateCheckoutSession } from '../dto/payments.dto';

@ApiCookieAuth()
@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  private stripe: Stripe;
  constructor(
    private readonly configService: ConfigService,
    private productModel: ProductModel,
  ) {
    const SecretAPIKey =
      this.configService.get<string>('STRIPE_SECRET_KEY') ?? '';
    this.stripe = new Stripe(SecretAPIKey);
  }

  // checkout-session
  @Post()
  @UseGuards(AuthJwtGuard)
  @ApiOperation({ summary: 'Create checkout session' })
  @ApiBody({ type: CreateCheckoutSession })
  async getCheckoutSession(
    @Body() body: CreateCheckoutSession,
    @Req() req: Request,
  ) {
    // 1. Convert product. ids into Type.Objectid
    const productIds = body.items.map(
      (item) => new Types.ObjectId(item.productId),
    );

    // 2. Fetch products from DB based on IDs from frontend
    const products = await this.productModel.findManyByIds(productIds);

    // 2. Map to Stripe line items
    const lineItems = products.map((product) => {
      const cartItem = body.items.find((i) => i.productId === product.id);
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
            images: [product.images[0]],
          },
          unit_amount: product.price * 100, // Convert to cents
        },
        quantity: cartItem?.quantity,
      };
    });
    // 2) Create the Checkout session
    // There many of options but these coming three are required
    // 1 Information about the session
    /*    const session = await this.stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/success`,
    cancel_url: `${req.protocol}://${req.get('host')}/checkout`,
    customer_email: req.user.email,
    line_items: lineItems,
        }); */
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${req.protocol}://${req.get('host')}/`, // With successful purchase, user will be redirected to this URL
      cancel_url: `${req.protocol}://${req.get('host')}/checkout`,

      // From the email we can get the user that created the order
      //customer_email: req.user.email,

      // This field: client_reference_id, will allows us to pass in some data
      // about the session that we are currently creating.
      // because with success purchase this field help us to create the order to our database
      client_reference_id: req.params.productId,

      // Some details about order itself
      // 2) Information about order
      // Array of objects, on per item
      line_items: lineItems,
    });
    // 3) Send it to the client as response
    return {
      status: 'success',
      session,
    };
  }
}
