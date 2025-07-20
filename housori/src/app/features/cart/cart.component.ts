import { Component } from "@angular/core";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false
})

export class CartComponent {
   totalDetails = [
    { name: 'subtotal', value: 45 },
    {name: 'shipping', value: 45},
    {name: 'tax', value: 45},
    { name: 'order total', value: 45 },
  ]
  constructor() {}
}
