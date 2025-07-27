import { NgModule } from "@angular/core";
import { OrderTotalComponent } from "./components/order-total/order-total.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [OrderTotalComponent],
  imports: [CommonModule, IonicModule],
  exports: [OrderTotalComponent]
})

export class SharedModule{}
