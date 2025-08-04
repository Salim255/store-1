import { Component, Input, SimpleChanges } from "@angular/core";
import { Product } from "src/app/features/products/model/product.model";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  standalone: false
})

export class CartItemComponent {
  @Input() item!: Product;

  get itemImage(): string {
    return this.item?.images[0] ?? '' ;
  }

  get itemPrice(): number {
    return this.item?.price ?? 0;
  }

  get itemDescription(): string {
    return this.item?.name ?? '';
  }
}
