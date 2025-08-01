import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "../../model/product.model";
@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.scss"],
  standalone: false
})

export class ProductsListComponent {
@Input() products!: Product[];
  constructor(private router: Router) {}
  onProduct(){
    this.router.navigateByUrl('/products/2')
  }
}
