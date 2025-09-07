import { Component, Input, signal } from "@angular/core";
import { Product } from "src/app/features/products/model/product.model";

@Component({
  selector: 'app-featured-item',
  templateUrl: './featured-item.component.html',
  styleUrls: ['./featured-item.component.scss'],
  standalone: false,
})
export class FeaturedItemComponent {
  @Input() product!:Product;
  constructor(){}

  get image(): string | undefined{
    const img = this.product?.images[0];
    return img;
  }
}
