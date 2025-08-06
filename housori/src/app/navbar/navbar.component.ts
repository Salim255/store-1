import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { CartDetails, CartService } from "../features/cart/services/cart-service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  standalone: false
})

export class NavbarComponent implements OnInit, OnDestroy {
  cartState = signal< CartDetails | null>(null);
  cartStateSubscription!: Subscription;
  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.subscribeToCartState();
      document.body.style.overflow = 'hidden';
  }

  subscribeToCartState(){
    this.cartStateSubscription = this.cartService.getCartState.subscribe(cartState => {
      console.log(cartState, "Hello from here")
      this.cartState.set(cartState)
    })
  }

  get numItemInCart(): number{
    const numItem = this.cartState()?.numItemInCart;
    return numItem ?? 0;
  }

  onAlert(){

  }
  ngOnDestroy(): void {
    this.cartStateSubscription.unsubscribe();
  }
}
