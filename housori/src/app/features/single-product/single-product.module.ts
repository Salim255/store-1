import { NgModule } from "@angular/core";
import { SingleProductComponent } from "./single-product.component";
import { SingleProductRoutingModule } from "./single-product-routing.module";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [ SingleProductComponent],
  imports: [SingleProductRoutingModule, IonicModule, CommonModule],
})

export class SingleProductModule{}
