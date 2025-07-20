import { NgModule } from "@angular/core";
import { OrdersComponent } from "./orders.component";
import { OrdersRoutingModule } from "./orders-routing.module";
import { IonicModule } from "@ionic/angular";
@NgModule({
  declarations: [OrdersComponent],
  imports: [OrdersRoutingModule, IonicModule],
})

export class OrdersModule {
  // Module logic goes here
}
