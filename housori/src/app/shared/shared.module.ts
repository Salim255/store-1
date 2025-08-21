import { NgModule } from "@angular/core";
import { OrderTotalComponent } from "./components/order-total/order-total.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { CustomSelectComponent } from "./kits/custom-select/custom-select.component";
import { PaginationComponent } from "./components/pagination/pagination.component";

@NgModule({
  declarations: [
    PaginationComponent,
    CustomSelectComponent,
    OrderTotalComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [PaginationComponent, CustomSelectComponent , OrderTotalComponent]
})

export class SharedModule{}
