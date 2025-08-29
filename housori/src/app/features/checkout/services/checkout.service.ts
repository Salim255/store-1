import { Injectable } from "@angular/core";
import {
  CheckoutHttpService,
  CheckoutPayload,
  CreatedSessionResponse,
  OrderItem,
  ShippingAddress,
} from "./checkout-http.service";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { CartDetails, CartService } from "../../cart/services/cart-service";

@Injectable({providedIn: 'root'})
export class CheckoutService {
  private shippingAddressSubject = new BehaviorSubject<ShippingAddress | null>(null)
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
    this.setShippingAddress(shippingAddress);
    const items: OrderItem[]  = cartDetails.cartItems.map((product) => {
      return {productId: product._id, quantity: product.amount}
     } );

    if (items.length === 0) throw new Error('No items in cart to checkout');
    const checkoutPayload: CheckoutPayload = { items, shippingAddress}

    return this.checkoutHttpService.createCheckoutSession(checkoutPayload).pipe(
      tap((session)=> {
        if (session.body?.data?.client_secret) {
          this.setOrderIsPlaced(true);
          const clientSecret = session.body?.data?.client_secret;
          this.clientSecretSubject.next(clientSecret);
        }

      })
    );
  }

  setShippingAddress(address: ShippingAddress):void{
    this.shippingAddressSubject.next(address)
  }
  get getShippingAddress(): Observable<ShippingAddress | null>{
    return this.shippingAddressSubject.asObservable();
  }
  get getClientSecret(): Observable<string | null> {
    return this.clientSecretSubject.asObservable();
  }
}
