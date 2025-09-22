import { NgModule } from "@angular/core";
import { OrderTotalComponent } from "./components/order-total/order-total.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { CustomSelectComponent } from "./kits/custom-select/custom-select.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { Placeholder } from "./components/place-holder/place-holder.component";
import { ToastrModule } from 'ngx-toastr';
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { RouterModule } from "@angular/router";
import { ProductCardComponent } from "./components/product-card/product-card.component";

@NgModule({
  declarations: [
    ProductCardComponent,
    Placeholder,
    PaginationComponent,
    CustomSelectComponent,
    OrderTotalComponent,
    SpinnerComponent
  ],
  imports: [
    RouterModule,
    ToastrModule,
    CommonModule,
    IonicModule,
  ],
  exports: [
    ProductCardComponent,
    Placeholder,
    PaginationComponent,
    CustomSelectComponent,
    OrderTotalComponent,
    SpinnerComponent
  ]
})

export class SharedModule{}
