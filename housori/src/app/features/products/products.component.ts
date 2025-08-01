import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { ProductsService } from "./services/products.service";
import { filter, Subscription } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";
import { Product } from "./model/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: false
})

export class ProductsComponent implements OnInit, OnDestroy {
  private productsSubscription!: Subscription;
  allProducts = signal< Product[]>([]);
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe();
    this.subscribeToProducts();
 /*  this.subscribeToProducts();
    this.router.events.pipe( filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.productsService.getAllProducts();
    })  */
  }

  private subscribeToProducts(){
    this.productsSubscription = this.productsService.productsSourceBehavior
    .subscribe((products) => {
      console.log(products);
      if (products){
        this.allProducts.set(products);
      }
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.productsSubscription) this.productsSubscription.unsubscribe()
  }
}
