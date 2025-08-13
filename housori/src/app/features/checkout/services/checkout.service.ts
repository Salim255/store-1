import { Injectable } from "@angular/core";
import { CheckoutHttpService, CheckoutPayload, CreatedSessionResponse, OrderItem, ShippingAddress } from "./checkout-http.service";
import { Observable, tap } from "rxjs";
import { loadStripe } from '@stripe/stripe-js';
import { environment } from "src/environments/environment";
import { HttpResponse } from "@angular/common/http";
import { CartDetails, CartService } from "../../cart/services/cart-service";

@Injectable({providedIn: 'root'})

export class CheckoutService {
  private ENV = environment;

  constructor(
    private cartService: CartService,
    private checkoutHttpService: CheckoutHttpService,
  ){}

  checkoutPayment(
    shippingAddress: ShippingAddress,
  ): Observable<HttpResponse<CreatedSessionResponse>>{
    const cartDetails: CartDetails = this.cartService.getCartDetailsForCheckout;
    const items: OrderItem[]  = cartDetails.cartItems.map((product) => {
      return {productId: product._id, quantity: product.amount}
     } );

    const checkoutPayload: CheckoutPayload = { items, shippingAddress}

    return this.checkoutHttpService.createCheckoutSession(checkoutPayload).pipe(
      tap((session)=> {
        console.log(session.body?.data.session.id)
        if (session.body?.data.session.id) {
          this.startCheckout(session.body?.data.session.id);
        }

      })
    );
  }

 private async startCheckout(sessionId: string) {
    const stripeJS = await loadStripe(this.ENV.stripePK);
    if (!stripeJS) {
      console.error('Stripe.js failed to load');
      return;
    }
    const { error } = await stripeJS.redirectToCheckout({ sessionId });
    if (error) {
      console.error('Stripe redirect error:', error);
    }
  }
}
