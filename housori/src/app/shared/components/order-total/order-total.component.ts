import { Component, Input } from "@angular/core";
import { CartDetails } from "src/app/features/cart/services/cart-service";
import { CartService } from "src/app/features/cart/services/cart-service";

export type TotalOrderDetails = Omit<CartDetails, 'cartItems'>;

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.scss'],
  standalone: false
})

export class OrderTotalComponent {
  @Input() totalDetails!: TotalOrderDetails | null;
  constructor(private cartService: CartService){}

  onClear(): void {
    this.cartService.clearCart();
  }

  get orderTotal(): number {
    return  this.totalDetails?.orderTotal ?? 0;
  }

  get shipping(): number {
    return this.totalDetails?.shipping ?? 0;
  }

  get tax(): number {
    return this.totalDetails?.tax ?? 0;
  }

  get cartTotal(): number {
    return this.totalDetails?.cartTotal ?? 0;
  }
}

