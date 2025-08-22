import { Component } from "@angular/core";
import { CartService } from "src/app/features/cart/services/cart-service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.html',
  styleUrls: ['./summary.scss'],
  standalone: false,
})

export class SummaryComponent {
 cartItems = [1,2];
  constructor() {}

  ngOnInit(): void {

  }

}
