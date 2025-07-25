import { NgModule } from "@angular/core";
import { ProductsComponent } from "./products.component";
import { ProductsRoutingModule } from "./products-routing.module";
import { FilterComponent } from "./components/filter/filter.component";
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";


@NgModule({
  declarations: [ ProductsComponent, FilterComponent, ProductsListComponent],
  imports: [ ProductsRoutingModule, CommonModule, FormsModule, IonicModule],
})

export class ProductsModule{}
