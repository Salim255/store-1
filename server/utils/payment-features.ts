import { AuthenticatedRequest } from 'src/modules/payments/controllers/payments.controller';
import {
  CreateCheckoutSession,
  ShippingAddress,
} from 'src/modules/payments/dto/payments.dto';
import { Product } from 'src/modules/product/schema/product.schema';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

export class PaymentFeatures {
  private stripe: Stripe;
  private req: AuthenticatedRequest;
  private body: CreateCheckoutSession;
  private baseUrl: string;
  private totalShippingPrice: number;
  private shippingAddress: ShippingAddress;
  private lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
  private products: Product[];
  private taxRate: string;

  constructor(
    stripe: Stripe,
    req: AuthenticatedRequest,
    body: CreateCheckoutSession,
    products: Product[],
    private configService: ConfigService,
  ) {
    this.stripe = stripe;
    this.req = req;
    this.body = body;
    this.baseUrl = `${this.req.protocol}://${this.req.host}/`;
    this.products = products;
    this.shippingAddress = body.shippingAddress;
    this.taxRate = this.configService.get<string>('TAX_RATE') || '';
  }

  public calcShippingPrice = (): this => {
    this.totalShippingPrice = this.body.items.reduce((total, item) => {
      const product = this.products.find((p) => p.id === item.productId);
      if (!product) return total;
      return total + product.shippingPrice * (item.quantity || 1);
    }, 0);
    return this;
  };

  public buildLineItems = (): this => {
    this.lineItems = this.products.map((product) => {
      const cartItem = this.body.items.find((i) => i.productId === product.id);
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
        tax_rates: [this.taxRate],
      };
    });
    return this;
  };
  public async checkoutSession(): Promise<
    Stripe.Response<Stripe.Checkout.Session>
  > {
    return await this.stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'],
      mode: 'payment',
      ui_mode: 'custom',
      // From the email we get the user that created the order
      customer_email: this.req.user.email,
      return_url: this.baseUrl,
      // This field: client_reference_id, will allows us to pass in some data
      // about the session that we are currently creating.
      // because with success purchase this field help us to create the order to our database
      client_reference_id: this.req.params.productId,
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: this.totalShippingPrice * 100,
              currency: 'eur',
            }, // 50 EUR shipping
            display_name: 'Standard Shipping',
            tax_behavior: 'exclusive', // or 'exclusive' inclusive
          },
        },
      ],
      payment_intent_data: {
        shipping: {
          name: this.shippingAddress.fullName,
          address: {
            line1: this.shippingAddress.address,
            city: this.shippingAddress.city,
            state: this.shippingAddress.city,
            postal_code: this.shippingAddress.postalCode,
            country: this.shippingAddress.country,
          },
        },
      },

      // Details about order itself
      // 2) Information about order
      // Array of objects, on per item
      line_items: this.lineItems,
    });
  }
}
