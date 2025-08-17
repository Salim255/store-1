import { Component } from "@angular/core";
import { OrdersService } from "./services/orders.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  standalone: false
})

export class OrdersComponent {
  ordersList = ['1', '2', '3', '4', '5'];
  headerItems = ['items', 'qty', 'unit price', 'amount', 'date']

  private ordersSubscription!: Subscription;
  constructor(private orderService: OrdersService){}
  ngOnInit(): void {
    this.subscribeToOrders();
  }

  private subscribeToOrders(): void {
    this.ordersSubscription = this.orderService
      .getOrders()
      .subscribe(orders => {
        console.log(orders.data.orders);
      });
  }

  ngOnDestroy(): void {
    this.ordersSubscription?.unsubscribe();
   }
}
