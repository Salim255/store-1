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

  async createPaymentIntent() {
    // Step 1: Create the customer
    const shippingInfo = {
      email: 'salim@example.com',
      name: 'Salim',
      address: {
        line1: '123 Rue de la Liberté',
        city: 'Lille',
        postal_code: '59000',
        country: 'FR',
      },
    };

    const customer = await this.stripe.customers.create(shippingInfo);
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 1099,
      currency: 'eur',
      description: 'Order description, human readable',
      receipt_email: 'customer@example.com',
      customer: customer.id,
      automatic_payment_methods: { enabled: true },
      setup_future_usage: 'off_session',
      metadata: {
        order_id: '1234',
        product_name: 'Premium Plan',
        product_image: 'https://your-site.com/images/premium.png',
        shipping_name: 'Salim',
        shipping_city: 'Lille',
        shipping_country: 'FR',
      },
    });

    this.logger.log(paymentIntent);
  }
  async createCheckoutSession(
    body: CreateCheckoutSession,
    req: Request,
  ): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    try {
      await this.createPaymentIntent();
      // 1. Convert product. ids into Type.Objectid
      const productIds = body.items.map(
        (item) => new Types.ObjectId(item.productId),
      );

      this.logger.log(productIds, body.shippingAddress);
      const shippingAddress = body.shippingAddress;
      // 2. Fetch products from DB based on IDs from frontend
      const products = await this.productModel.findManyByIds(productIds);
      // 2. Map to Stripe line items
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        products.map((product) => {
          const cartItem = body.items.find((i) => i.productId === product.id);
          return {
            price_data: {
              currency: 'eur',
              product_data: {
                name: product.name,
                description: product.description,
                images: [product.images[0]],
              },
              unit_amount: product.price * 100, // Convert to cents
            },
            quantity: cartItem?.quantity,
            tax_rates: ['txr_1Rvy6GFrWj4JpsgpBNszhgB0'],
          };
        });

      // 2) Create the Checkout session
      // There many of options but these coming three are required
      // 1 Information about the session
      const session: Stripe.Response<Stripe.Checkout.Session> =
        await this.stripe.checkout.sessions.create({
          payment_method_types: ['card', 'paypal'],
          mode: 'payment',
          ui_mode: 'custom',
          // From the email we can get the user that created the order
          customer_email: 'salim@example.com',
          return_url: 'http://localhost:4200/',
          //customer_creation: 'always',
          // This field: client_reference_id, will allows us to pass in some data
          // about the session that we are currently creating.
          // because with success purchase this field help us to create the order to our database
          client_reference_id: req.params.productId,
          shipping_options: [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: { amount: 5000, currency: 'eur' }, // 50 EUR shipping
                display_name: 'Standard Shipping',
                tax_behavior: 'exclusive', // or 'exclusive' inclusive
              },
            },
          ],
          payment_intent_data: {
            shipping: {
              name: shippingAddress.fullName,
              address: {
                line1: shippingAddress.address,
                city: shippingAddress.city,
                state: shippingAddress.city,
                postal_code: shippingAddress.postalCode,
                country: shippingAddress.country,
              },
            },
          },

          // Some details about order itself
          // 2) Information about order
          // Array of objects, on per item
          line_items: [
            ...lineItems,
           /*  {
              price_data: {
                currency: 'eur',
                product_data: {
                  name: 'Shipping',
                  description: 'Standard shipping fee for your order',
                },
                unit_amount: 100, // 5.00 EUR
              },
              quantity: 1, // single line item for all shipping
              tax_rates: ['txr_1Rvy6GFrWj4JpsgpBNszhgB0'], // VAT for shipping
            }, */
          ],
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
