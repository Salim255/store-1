import { Component, signal } from "@angular/core";
import { Subscription } from "rxjs";
import { CartDetails, CartItem, CartService } from "src/app/features/cart/services/cart-service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.html',
  styleUrls: ['./summary.scss'],
  standalone: false,
})

export class SummaryComponent {
  private cartSubscription!: Subscription;
  cart = signal< CartDetails | null>(null);
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subscribeToCart();
  }

  subscribeToCart():void{
    this.cartSubscription = this.cartService.getCartState.subscribe(cart => {
      console.log(cart);
      this.cart.set(cart);
    })
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.cartSubscription?.unsubscribe();
  }

  get getItems(): CartItem[] | []{
    return this.cart()?.cartItems || []
  }
}
