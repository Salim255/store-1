import { Component, Input } from "@angular/core";
import { Product } from "src/app/features/products/model/product.model";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: false,
})
export class ProductCardComponent {
  @Input() product!:Product;
  constructor(){}

  get image(): string | undefined{
    const img = this.product?.images[0];
    return img;
  }

}
