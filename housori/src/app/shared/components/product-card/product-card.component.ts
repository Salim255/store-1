import { Component, Input } from "@angular/core";
import { Product } from "src/app/features/products/model/product.model";
import { SingleProductService } from "src/app/features/products/services/single-product.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: false,
})
export class ProductCardComponent {
  @Input() product!:Product;
  constructor(private singleProductService: SingleProductService, private router:  Router){}

  get image(): string | undefined{
    const img = this.product?.images[0];
    return img;
  }

    onProduct(){
    this.singleProductService.setSingleProduct(this.product);
    this.router.navigateByUrl(`/products/${this.product._id}`);
  }
}
