import { Component, Input, SimpleChanges } from "@angular/core";
import { CartItem } from "../../services/cart-service";
import { CartService } from "../../services/cart-service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  standalone: false
})

export class CartItemComponent {
  @Input() item!: CartItem ;

  constructor(private cartService: CartService){}

  get itemImage(): string {
    return this.item?.images[0] ?? '' ;
  }

  get itemPrice(): number {
    return this.item?.price ?? 0;
  }

  get itemDescription(): string {
    return this.item?.name ?? '';
  }

  increaseAmount(itemId: string, amount: number): void{
    this.cartService.editItemAmount(itemId, amount);
  }

  decreaseAmount(itemId: string, amount: number): void{
    this.cartService.editItemAmount(itemId, amount);
  }

  removeItem(itemId: string): void{
    this.cartService.removeItemFromCart(itemId);
  }
}
