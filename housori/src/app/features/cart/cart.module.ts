import { NgModule } from "@angular/core";
import { CartComponent } from "./cart.component";
import { CartRoutingModule } from "./cart-routing.module";
import { CommonModule } from "@angular/common";
import { CartItemComponent } from "./components/cart-item/cart-item.component";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [CartComponent, CartItemComponent],
  imports: [
    CommonModule, CartRoutingModule,
    IonicModule, SharedModule,
  ],
})

export class CartModule { }
