import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { Subscription } from "rxjs";
import { CartDetails, CartItem, CartService } from "src/app/features/cart/services/cart-service";
import { CheckoutService } from "../../services/checkout.service";
import { ShippingAddress } from "../../services/checkout-http.service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.html',
  styleUrls: ['./summary.scss'],
  standalone: false,
})

export class SummaryComponent implements OnInit, OnDestroy {
  private shippingAddressSubscription!: Subscription;
  private cartSubscription!: Subscription;
  shippingAddress = signal<ShippingAddress | null>(null);
  cart = signal<CartDetails | null>(null);

  constructor(
    private checkoutService: CheckoutService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.subscribeToCart();
    this. subscribeToShippingAddress();
  }

  subscribeToShippingAddress(){
    this.shippingAddressSubscription = this.checkoutService
      .getShippingAddress
      .subscribe(address => {
        this.shippingAddress.set(address);
        },
      )
  }

  subscribeToCart():void{
    this.cartSubscription = this.cartService
    .getCartState
    .subscribe(cart => {
      this.cart.set(cart);
     },
    )
  }

  get getItems(): CartItem[] | []{
    return this.cart()?.cartItems || []
  }
  get getTotalDetails(): Omit<CartDetails, 'cartItems'> | null {
    const cartValue = this.cart() ;
    if(!cartValue) return null;
    const { cartItems, ...rest} = cartValue;
    return rest;
  }

  get fullName(): string{
    return this.shippingAddress()?.fullName || '';
  }

   get addressLine(): string {
    const value = this.shippingAddress();
    if (!value) return '';
    return `${value.address}`
  }
  get cityCountry(): string {
    const value = this.shippingAddress();
    if (!value) return '';
    const addressString = `${value.city}, ${value.postalCode} ${value.country}`;
    return addressString;
  }
  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
    this.shippingAddressSubscription?.unsubscribe();
  }
}
