import { Injectable } from "@angular/core";
import { Product } from "../model/product.model";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ProductHttpService {
  private ENV = environment;
  private readonly basePath = `${this.ENV.apiUrl}/products`;
  constructor(private httpClient:  HttpClient ){}
  fetchAllProducts(): Observable<{ status: string, data: { products: Product []}}>{
    return this.httpClient.get<any>(`${this.basePath}`);
  }
}
