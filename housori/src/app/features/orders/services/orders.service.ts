import { Injectable } from "@angular/core";
import { GetOrdersResponseDto, OrdersHttpService } from "./orders-http.service";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class OrdersService {
  constructor(private ordersHttpService: OrdersHttpService) {}

  getOrders(): Observable<GetOrdersResponseDto> {
    return this.ordersHttpService.getOrders();
  }
}
