import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';
import { ProductModel } from 'src/modules/product/model/product.model';
import Stripe from 'stripe';
import { CreateCheckoutSession } from '../dto/payments.dto';
import { Request, Response } from 'express';

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
    req: Request,
  ): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    try {
      // 1. Convert product. ids into Type.Objectid
      const productIds = body.items.map(
        (item) => new Types.ObjectId(item.productId),
      );

      this.logger.log(productIds);
      // 2. Fetch products from DB based on IDs from frontend
      const products = await this.productModel.findManyByIds(productIds);
      // 2. Map to Stripe line items
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        products.map((product) => {
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
      const session: Stripe.Response<Stripe.Checkout.Session> =
        await this.stripe.checkout.sessions.create({
          payment_method_types: ['card', 'paypal'],
          mode: 'payment',
          success_url: `${req.protocol}://localhost:4200/`, // With successful purchase, user will be redirected to this URL
          cancel_url: `${req.protocol}://localhost:4200/checkout`,
          // From the email we can get the user that created the order
          //customer_email: req.user.email,
          billing_address_collection: 'required', // ← collect billing address
          shipping_address_collection: {
            allowed_countries: ['FR', 'US', 'GB'], // ← collect shipping address
          },

          customer_creation: 'always',
          // This field: client_reference_id, will allows us to pass in some data
          // about the session that we are currently creating.
          // because with success purchase this field help us to create the order to our database
          client_reference_id: req.params.productId,

          // Some details about order itself
          // 2) Information about order
          // Array of objects, on per item
          line_items: lineItems,
        });
      return session;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  createOrderFromCheckout(req: Request) {
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
      this.logger.log(event.data.object);
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
