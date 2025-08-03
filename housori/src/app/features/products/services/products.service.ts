import { Injectable } from "@angular/core";
import { ProductHttpService } from "./products-http.service";
import { Product } from "../model/product.model";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { HttpParams } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ProductsService {
  productsSourceBehavior = new BehaviorSubject<Product[] | null>(null);
  constructor(private productHttpService: ProductHttpService){}

  getAllProducts(paramsObject: HttpParams): Observable<{status: string, data: { products: Product[]}}>{
    return this.productHttpService.fetchAllProducts(paramsObject).pipe(
      tap((response => {
        console.log(response, "hello from service");
        if (response.data) {
          this.productsSourceBehavior.next(response.data.products)
        }
      }))
    );
  }
}
