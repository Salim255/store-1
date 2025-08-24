import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';
import { ProductModel } from 'src/modules/product/model/product.model';
import Stripe from 'stripe';
import { CreateCheckoutSession } from '../dto/payments.dto';
import { AuthenticatedRequest } from '../controllers/payments.controller';
import { PaymentFeatures } from 'utils/payment-features';
import { Product } from 'src/modules/product/schema/product.schema';

@Injectable()
export class PaymentsService {
  logger = new Logger('Payments');
  private stripe: Stripe;
  constructor(
    private readonly configService: ConfigService,
    private productModel: ProductModel,
  ) {
    const SecretAPIKey =
      this.configService.get<string>('STRIPE_SECRET_KEY') ?? '';
    this.stripe = new Stripe(SecretAPIKey);
  }

  async createCheckoutSession(
    body: CreateCheckoutSession,
    req: AuthenticatedRequest,
  ): Promise<string | null> {
    try {
      // ===== CONVERT PRODUCT IDS INTO Type.Objectid =====
      const productIds = body.items.map(
        (item) => new Types.ObjectId(item.productId),
      );
      // ==== FETCH PRODUCTS FROM DB BASED ON IDS ======
      const products: Product[] =
        await this.productModel.findManyByIds(productIds);

      //
      const paymentFeature = new PaymentFeatures(
        this.stripe,
        req,
        body,
        products,
        this.configService,
      )
        .calcShippingPrice()
        .buildLineItems();

      // ====== CREATE CHECKOUT SESSION ======
      const session: Stripe.Response<Stripe.Checkout.Session> =
        await paymentFeature.checkoutSession();
      return session.client_secret ?? null;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  createOrderFromCheckout(req: AuthenticatedRequest) {
    const sig = req.headers['stripe-signature'] as string;
    let event: Stripe.Event;
    try {
      const stripeWebhookSecret =
        this.configService.get<string>('STRIPE_WEBHOOK_SECRET') ?? '';
      event = this.stripe.webhooks.constructEvent(
        req.body as Buffer, // raw body from bodyParser.raw
        sig,
        stripeWebhookSecret,
      );
      // Handle event types
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        this.logger.log(session);
        // 💾 Save order to DB
        //await this.paymentsService.createOrderFromCheckout(session);
      }
    } catch (err: any) {
      console.error(`Webhook signature verification failed.`, err);
      //return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
}
