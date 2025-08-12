import {Component, OnDestroy, OnInit, signal} from "@angular/core";
import { CartService } from "../cart/services/cart-service";
import { Subscription } from "rxjs";
import { TotalOrderDetails } from "src/app/shared/components/order-total/order-total.component";
import { CheckoutService } from "./services/checkout.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: false,
})

export class CheckoutComponent implements OnInit, OnDestroy{
  private cartStateSubscription!: Subscription;
  totalDetails = signal< TotalOrderDetails | null>(null);

  constructor(
    private checkoutService: CheckoutService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.subscribeToCartState();
  }

  subscribeToCartState(){
    this.cartStateSubscription = this.cartService.getCartState.subscribe(cartState => {
      if (cartState) {
        const {cartItems, ...rest} = cartState;
        this.totalDetails.set(rest);
      }
    })
  }

  ngOnDestroy(): void {
    this.cartStateSubscription?.unsubscribe();
  }
}
