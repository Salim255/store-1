import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Order } from "../model/order.model";

export interface GetOrdersResponseDto {
 status: string;
  data: { orders: Order []};
}
@Injectable({ providedIn: "root"})
export class OrdersHttpService {
  private ENV = environment;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<GetOrdersResponseDto>{
    return this.http.get<GetOrdersResponseDto>(`${this.ENV.apiUrl}/orders/users`,{
      withCredentials: true
    });
  }
}
