import { NgModule } from "@angular/core";
import { OrdersComponent } from "./orders.component";
import { OrdersRoutingModule } from "./orders-routing.module";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [OrdersComponent],
  imports: [OrdersRoutingModule, IonicModule, CommonModule],
})

export class OrdersModule {
  // Module logic goes here
}
