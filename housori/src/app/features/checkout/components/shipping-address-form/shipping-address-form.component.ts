import { Component } from "@angular/core";
import { CheckoutService } from "../../services/checkout.service";

@Component({
  selector: 'app-shipping-address-form',
  templateUrl: './shipping-address-form.component.html',
  styleUrls: ['./shipping-address-form.component.scss'],
  standalone: false
})

export class ShippingAddressForm{
  constructor(private checkoutService: CheckoutService){}

  onPlaceOrder(){
    const items =[
      {
        productId: "688cac7a02ee10a957d15ad2",
        quantity: 1
      }]

    this.checkoutService.checkoutPayment(items).subscribe();
  }

}
