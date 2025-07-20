import {Component} from "@angular/core"

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: false,
})

export class CheckoutComponent{
  totalDetails = [
    { name: 'subtotal', value: 45 },
    {name: 'shipping', value: 45},
    {name: 'tax', value: 45},
    { name: 'order total', value: 45 },
  ]
  constructor(){}
}
