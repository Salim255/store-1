import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Appearance, Stripe, StripeElements, StripePaymentElement, StripePaymentElementOptions, loadStripe } from '@stripe/stripe-js';
import { TotalOrderDetails } from 'src/app/shared/components/order-total/order-total.component';
import { environment } from 'src/environments/environment';

 const appearance: Appearance = {
 theme: 'stripe',
 variables: {
    colorPrimary: '#0E766E',
    colorBackground: '#FAF9F7',
    //colorText: '#30313d',
    colorDanger: '#df1b41',
    fontFamily: 'Ideal Sans, system-ui, sans-serif',
    spacingUnit: '5px',
    borderRadius: '10px',
    // See all possible variables below

    gridColumnSpacing: '10px',
    gridRowSpacing: '2rem',
    fontLineHeight: '1.5',
    fontSizeBase: '1rem',
    fontWeightNormal: '400',


  },
  rules: {
      '.Label': {
        fontWeight: '600',
        color: '#8b0a0a',
        fontSize: '1.2rem',
      },
      '.Input': {
         colorText: '#8b0a0a',
         fontSize: '1rem',
          width: '100%',
      },
      '.Tab': {

        border: '1px solid #E0E6EB',
        boxShadow: '1 1px 1px rgba(0, 0, 0, 0.2), 1 1px 1px rgba(0, 0, 0, 0.1)',
      },

      '.Tab:hover': {
        color: 'var(--colorText)',
      },

      '.Tab--selected': {
        borderColor: '#E0E6EB',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)',
      },

      '.Input--invalid': {
        boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)',
      },

       '.RadioIcon': {
      width: '24px'
    },
    '.RadioIconOuter': {
      stroke: '#E0E6EB'
    },
    '.RadioIconInner': {
      r: '16'
    }
      // See all supported class names and selector syntax below
    }
};


const options: StripePaymentElementOptions = {
  layout: 'tabs', // Use 'accordion' if you have >4 payment methods
  fields: {
    billingDetails: {
      name: 'auto',
      email: 'auto',
      address: 'auto'
    }
  },
  defaultValues: {
    billingDetails: {
      name: 'Salim Hassan',
      email: 'salim@example.com',
      address: {
        line1: '123 Rue de la Liberté',
        city: 'Lille',
        postal_code: '59000',
        country: 'FR'
      }
    }
  },
  business: {
    name: 'SalimTech'
  }
};

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @Input() totalDetails!: TotalOrderDetails
  ENV = environment ;
  stripe!: Stripe | null;
  payment!: StripePaymentElement;
  elements: StripeElements | null = null;
  paymentElement: StripePaymentElement | null = null;
  billingAddressElement: any = null;
  shippingAddressElement: any = null;
  checkout: any;
  errorMessage: string = '';
  isLoading: boolean = false;
  stripeReady: boolean = false;
  constructor() {}

  async ngOnInit() {
    this.stripe = await loadStripe(`${this.ENV.stripePK}`); // Replace with your Stripe publishable key

    if (!this.stripe) {
      console.log("Hello", this.stripe);
      return;
    }

    this.paymentElementWithCheckout();
  }

  async paymentElementWithCheckout(){
    const fetchClientSecret = 'cs_test_a1pYMqNdLJNu4nWYd0BhwkjaWJwGmQ3MVvzxJqJcSqOElRvK9reHDrqSmi_secret_fidwbEhqYWAnPydmcHZxamgneCUl';
      this.checkout = await this.stripe!.initCheckout({
      fetchClientSecret: () => fetchClientSecret,
      elementsOptions: {
        appearance
      }
    } as any); // 👈 bypass TypeScript error
    console.log(this.checkout, "hello checlot");

    this.paymentElement = this.checkout.createPaymentElement(
      { layout: {
          type: 'tabs', // or 'accordion'
        },
        fields: {
    billingDetails: {
      name: 'auto', // Force name to always show
      email: 'auto',  // Keep as auto or 'never' if collecting elsewhere
      phone: 'auto',  // Keep as auto or 'never'
      address: 'auto' // Keep as auto or 'never'
    }
  }
      });

     // Create a separate billing address element
    const test = this.checkout.getShippingAddressElement();
    console.log(test, "hello from billing address");

    // Create a separate shipping address element if needed
    //this.shippingAddressElement = this.checkout.createShippingAddressElement();

    //this.shippingAddressElement.mount('#shipping-address-element');
    this.paymentElement!.mount('#payment-element');
    this.stripeReady = true;
     console.log('hello from session', this.checkout.session());
  }
   async handleSubmitWithCheckout() {

    this.isLoading = true;
    this.errorMessage = '';


    const result = await this.checkout!.confirm(
{
  redirect: 'if_required'
}
        //return_url: 'http://localhost:4200/'

    );
    console.log('hello from submit', result);
    localStorage.setItem('result', result);
    if ( result.error) {
      this.errorMessage =  result.error?.message!;
    }

    this.isLoading = false;
  }

  paymentElementWithPaymentIntent(){
    const clientSecret = 'cs_test_a1A8ljMTz07XNYuYDVeA9AYgdWO8E2lyaPWx6QPEBqSQNVmxrVo3GyN3kn_secret_fidwbEhqYWAnPydmcHZxamgneCUl';
    this.elements = this.stripe!.elements({clientSecret, appearance});
    this.payment = this.elements.create('payment', options);
    this.payment.mount('#payment-element');
    this.stripeReady = true;
  }



  async handleSubmit() {

    this.isLoading = true;
    this.errorMessage = '';
     console.log('hello from submit', this.elements);
    const { error } = await this.stripe!.confirmPayment({
      elements: this.elements!,
      confirmParams: {
        return_url: 'http://localhost:4200/'
      }
    });
    console.log('hello from submit')
    if (error) {
      this.errorMessage = error?.message!;
    }

    this.isLoading = false;
  }
}
