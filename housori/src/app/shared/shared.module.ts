import { NgModule } from "@angular/core";
import { OrderTotalComponent } from "./components/order-total/order-total.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { CustomSelectComponent } from "./kits/custom-select/custom-select.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { Placeholder } from "./components/place-holder/place-holder.component";
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    Placeholder,
    PaginationComponent,
    CustomSelectComponent,
    OrderTotalComponent,
  ],
  imports: [
    ToastrModule,
    CommonModule,
    IonicModule,
  ],
  exports: [
    Placeholder,
    PaginationComponent,
    CustomSelectComponent,
    OrderTotalComponent,
  ]
})

export class SharedModule{}
