import { NgModule } from "@angular/core";
import { ProductsComponent } from "./products.component";
import { ProductsRoutingModule } from "./products-routing.module";

@NgModule({
  declarations: [ProductsComponent],
  imports: [ProductsRoutingModule],
})

export class ProductsModule{}
