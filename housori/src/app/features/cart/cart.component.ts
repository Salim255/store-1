import { Component, signal } from "@angular/core";
import { CartDetails, CartService } from "./services/cart-service";
import { Subscription } from "rxjs";
import { Product } from "../products/model/product.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false
})

export class CartComponent {
  cartState = signal<CartDetails | null>(null);
   totalDetails = [
    { name: 'subtotal', value: 45 },
    {name: 'shipping', value: 45},
    {name: 'tax', value: 45},
    { name: 'order total', value: 45 },
  ]

  cartStateSubscription!: Subscription;
  constructor(private cartService : CartService ) {}

  ngOnInit(): void {
    this.subscribeToCartState();
  }

  subscribeToCartState(){
    this.cartStateSubscription =
      this.cartService.getCartState.subscribe((cartState) => {this.cartState.set(cartState)});
  }

  get cartItems(): Product[]{
    return this.cartState()?.cartItems ?? [];
  }
  ngOnDestroy(): void {
    this.cartStateSubscription?.unsubscribe();
  }
}
