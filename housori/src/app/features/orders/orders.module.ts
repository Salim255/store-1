import { NgModule } from "@angular/core";
import { OrdersComponent } from "./orders.component";
import { OrdersRoutingModule } from "./orders-routing.module";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { OrdersItemComponent } from "./components/orders-item/orders-item.components";
import { ListHeader } from "./components/list-header/list-header.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    ListHeader,
    OrdersItemComponent,
    OrdersComponent,
  ],
  imports: [
    SharedModule,
    OrdersRoutingModule,
    IonicModule,
    CommonModule,
  ],
})

export class OrdersModule {
  // Module logic goes here
}
