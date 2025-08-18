import { Component, Input, SimpleChanges } from "@angular/core";
import { OrderItem } from "../../model/order.model";

@Component({
  selector:'app-orders-item',
  templateUrl: './orders-item.components.html',
  styleUrls: ['./orders-item.components.scss'],
  standalone: false,
})
export class OrdersItemComponent {
  @Input() orderItem!: OrderItem;
  bedImage= 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVkfGVufDB8fDB8fHww';
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('order item changes', this.orderItem);
  }

  get getImageUrl(): string {
    return this.orderItem.productId?.images[0] || this.bedImage;
  }

  get unitPrice(): number {
    return this.orderItem.productId?.price || 0;
  }
}
