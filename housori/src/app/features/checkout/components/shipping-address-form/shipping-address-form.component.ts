import { Component } from "@angular/core";
import { CheckoutService } from "../../services/checkout.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ShippingAddress } from "../../services/checkout-http.service";

@Component({
  selector: 'app-shipping-address-form',
  templateUrl: './shipping-address-form.component.html',
  styleUrls: ['./shipping-address-form.component.scss'],
  standalone: false
})

export class ShippingAddressForm{
  shippingFields!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private checkoutService: CheckoutService,
  ){}

  ngOnInit(): void {
    this.buildForm();
  }

  onPlaceOrder(){
    const country = this.shippingFields.get('country')?.value;
    const fullname = this.shippingFields.get('fullName')?.value;
    const city = this.shippingFields.get('city')?.value;
    const postalCode = this.shippingFields.get('postalCode')?.value;
    const phone = this.shippingFields.get('phone')?.value;
    const address = this.shippingFields.get('address')?.value;

    const shippingAddress:ShippingAddress =
       {country, fullname, city, postalCode, phone, address};
    this.checkoutService.setOrderIsPlaced(true);
    this.checkoutService.checkoutPayment(shippingAddress).subscribe();
  }

  buildForm(){
    this.shippingFields = this.formBuilder.group({
      fullName: [null, [ Validators.required ]],
      country: [null, [ Validators.required ]],
      address: [null, [ Validators.required ]],
      city:  [null, [ Validators.required ]],
      postalCode: [null, [ Validators.required ]],
      phone: [null, [ Validators.required ]],
    })
  }

}
