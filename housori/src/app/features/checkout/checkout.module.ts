import { NgModule } from "@angular/core";
import { CheckoutComponent } from "./checkout.component";
import { CheckoutRoutingModule } from "./checkout-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";


@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CheckoutRoutingModule, ReactiveFormsModule,
    FormsModule, CommonModule, IonicModule]
})

export class CheckoutModule {

}
