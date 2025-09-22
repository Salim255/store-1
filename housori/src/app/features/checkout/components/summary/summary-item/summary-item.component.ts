import { Component, Input } from "@angular/core";
import { CartItem } from "src/app/features/cart/services/cart-service";

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss'],
})

export class SummaryItemComponent {
  @Input() item!: CartItem;
  constructor() {}
}
