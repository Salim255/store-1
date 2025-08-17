import { Component } from "@angular/core";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  standalone: false
})

export class OrdersComponent {
  ordersList = ['1', '2', '3', '4', '5'];
  headerItems = ['items', 'qty', 'unit price', 'amount', 'date']
  constructor(){}
}
