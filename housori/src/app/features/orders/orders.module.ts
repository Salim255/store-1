import { NgModule } from "@angular/core";
import { OrdersComponent } from "./orders.component";
import { OrdersRoutingModule } from "./orders-routing.module";

@NgModule({
  declarations: [OrdersComponent],
  imports: [OrdersRoutingModule],
})

export class OrdersModule {
  // Module logic goes here
}
