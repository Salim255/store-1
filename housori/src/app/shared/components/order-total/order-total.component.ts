import { Component, Input } from "@angular/core";

type TotalOrderItem = {
  name: string;
  value: number;
}
@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.scss'],
  standalone: false
})

export class OrderTotalComponent {
  @Input() totalDetails!: TotalOrderItem [];
  constructor(){}
}
