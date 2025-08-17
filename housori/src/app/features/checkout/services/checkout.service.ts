import { Injectable } from "@angular/core";
import { CheckoutHttpService, CheckoutPayload, CreatedSessionResponse, OrderItem, ShippingAddress } from "./checkout-http.service";
import { BehaviorSubject, Observable, of, tap } from "rxjs";
import { loadStripe } from '@stripe/stripe-js';
import { environment } from "src/environments/environment";
import { HttpResponse } from "@angular/common/http";
import { CartDetails, CartService } from "../../cart/services/cart-service";

@Injectable({providedIn: 'root'})

export class CheckoutService {
  private ENV = environment;
  private orderIsPlacedSubject = new BehaviorSubject<boolean>(false);
  private clientSecretSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private cartService: CartService,
    private checkoutHttpService: CheckoutHttpService,
  ){}

  setOrderIsPlaced(placed: boolean): void {
    this.orderIsPlacedSubject.next(placed);
  }

  get getOrderIsPlaced(): Observable<boolean> {
    return this.orderIsPlacedSubject.asObservable();
  }

  checkoutPayment(
    shippingAddress: ShippingAddress,
  ): Observable<HttpResponse<CreatedSessionResponse>>{

    const cartDetails: CartDetails = this.cartService.getCartDetailsForCheckout;

    const items: OrderItem[]  = cartDetails.cartItems.map((product) => {
      return {productId: product._id, quantity: product.amount}
     } );
     console.log(items, 'items from checkout service');
    if (items.length === 0) throw new Error('No items in cart to checkout');
    const checkoutPayload: CheckoutPayload = { items, shippingAddress}

    return this.checkoutHttpService.createCheckoutSession(checkoutPayload).pipe(
      tap((session)=> {
        console.log(session.body?.data.client_secret, 'session client secret');
        if (session.body?.data.client_secret) {
          this.setOrderIsPlaced(true);
          const clientSecret = session.body?.data.client_secret;
          console.log('Client Secret:', clientSecret);
          this.clientSecretSubject.next(clientSecret);
        }

      })
    );
  }

  get getClientSecret(): Observable<string | null> {
    return this.clientSecretSubject.asObservable();
  }
}
