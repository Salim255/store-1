import Stripe from 'stripe';

// Create-Session-Checkout
export class CreateCheckoutSession {
  items: {
    productId: string;
    quantity: number;
  }[];
}

export class CreatedSessionResponse {
  status: 'success';
  data: {
    session: Stripe.Response<Stripe.Checkout.Session>;
  };
}
