import { Component, Input } from "@angular/core";
import { CartDetails } from "src/app/features/cart/services/cart-service";

export type TotalOrderDetails = Omit<CartDetails, 'cartItems'>;

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.scss'],
  standalone: false
})

export class OrderTotalComponent {
  @Input() totalDetails!: TotalOrderDetails | null;
  constructor(){}
}
