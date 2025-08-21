import { NgModule } from "@angular/core";
import { ProductsComponent } from "./products.component";
import { ProductsRoutingModule } from "./products-routing.module";
import { FilterComponent } from "./components/filter/filter.component";
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";


@NgModule({
  declarations: [
    ProductsComponent,
    FilterComponent,
    ProductsListComponent,
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
})

export class ProductsModule{}
