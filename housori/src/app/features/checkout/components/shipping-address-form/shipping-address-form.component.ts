import { Component } from "@angular/core";
import { CheckoutService } from "../../services/checkout.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-shipping-address-form',
  templateUrl: './shipping-address-form.component.html',
  styleUrls: ['./shipping-address-form.component.scss'],
  standalone: false
})

export class ShippingAddressForm{
  statusChangeSubscription = new Subscription();
  shippingFields!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private checkoutService: CheckoutService,
  ){}

  ngOnInit(): void {
    this.buildForm();

    this.subscribeToStatusChange();
  }

  onPlaceOrder(){
      const country = this.shippingFields.get('country')?.value;
      const fullname = this.shippingFields.get('fullName')?.value;
      const city = this.shippingFields.get('city')?.value;
      const postalCode = this.shippingFields.get('postalCode')?.value;
      const phone = this.shippingFields.get('phone')?.value;
      const address = this.shippingFields.get('address')?.value;
      /* const shippingAddress = {country, fullname, city, postalCode, phone, address};
      const items =[
        {
          productId: "688cac7a02ee10a957d15ad2",
          quantity: 1
        }] */

    //this.checkoutService.checkoutPayment(items).subscribe();
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

  subscribeToStatusChange(){
   this.statusChangeSubscription.unsubscribe();
   this.statusChangeSubscription =  this.shippingFields.statusChanges.subscribe(text => {
      console.log(text);
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.statusChangeSubscription.unsubscribe();
  }
}
