import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { ProductsService } from "./services/products.service";
import { filter, Subscription } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";
import { Product } from "./model/product.model";
import { HttpParams } from "@angular/common/http";
import { ApiMetaData } from "./services/products-http.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: false
})

export class ProductsComponent implements OnInit, OnDestroy {
  private productsSubscription!: Subscription;
  allProducts = signal< Product[]>([]);
  metaData = signal<ApiMetaData>({});

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const params = new HttpParams();
    this.productsService.getAllProducts(params).subscribe();
    this.subscribeToProducts();
 /*  this.subscribeToProducts();
    this.router.events.pipe( filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.productsService.getAllProducts();
    })  */
  }

  private subscribeToProducts(){
    this.productsSubscription = this.productsService.productsSourceBehavior
    .subscribe((data) => {
      //console.log(products);
      if (data){
       this.allProducts.set(data.products);
       this.metaData.set(data.meta);
      }
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.productsSubscription) this.productsSubscription.unsubscribe()
  }
}
