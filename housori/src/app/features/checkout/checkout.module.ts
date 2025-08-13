import { NgModule } from "@angular/core";
import { CheckoutComponent } from "./checkout.component";
import { CheckoutRoutingModule } from "./checkout-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/shared/shared.module";
import {ShippingAddressForm} from "./components/shipping-address-form/shipping-address-form.component"
import { PaymentComponent } from "./components/payment/payment.component";

@NgModule({
  declarations: [
    CheckoutComponent,
    ShippingAddressForm,
    PaymentComponent
  ],
  imports: [
    CheckoutRoutingModule, ReactiveFormsModule,
    FormsModule, CommonModule, IonicModule,
    SharedModule,
  ]
})

export class CheckoutModule {

}
