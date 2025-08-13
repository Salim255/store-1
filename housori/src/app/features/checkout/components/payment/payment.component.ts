import { Component, NgZone, OnInit } from '@angular/core';
import { Appearance, Stripe, StripeElements, StripePaymentElement, StripePaymentElementOptions, loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

 const appearance: Appearance = {
 theme: 'flat',
 variables: {
    colorPrimary: '#0570de',
    colorBackground: '#019638',
    colorText: '#30313d',
    colorDanger: '#df1b41',
    fontFamily: 'Ideal Sans, system-ui, sans-serif',
    spacingUnit: '2px',
    borderRadius: '10px',
    // See all possible variables below
  },
  rules: {
      '.Tab': {
        border: '1px solid #E0E6EB',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)',
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
  ENV = environment ;
  stripe!: Stripe | null;
  payment!: StripePaymentElement;
  elements: StripeElements | null = null;
  paymentElement: StripePaymentElement | null = null;
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
    const fetchClientSecret = 'cs_test_a1pmxcWFtTKoceAJfKoQcUk1ZJ7s7LpF4zJiTEKsNMYQU9Fq8S0XcUVoKH_secret_fidwbEhqYWAnPydmcHZxamgneCUl';
      this.checkout = await this.stripe!.initCheckout({
      fetchClientSecret: () => fetchClientSecret,
      elementsOptions: {
        appearance
      }
    } as any); // 👈 bypass TypeScript error
    console.log(this.checkout, "hello checlot")
    this.paymentElement = this.checkout.createPaymentElement(
      { layout: {
          type: 'tabs', // or 'accordion'
        }
      });
    this.paymentElement!.mount('#payment-element');
    this.stripeReady = true;
  }
   async handleSubmitWithCheckout() {

    this.isLoading = true;
    this.errorMessage = '';
     console.log('hello from submit', this.checkout);
    const { error } = await this.checkout!.confirm(

        //return_url: 'http://localhost:4200/'

    );
    console.log('hello from submit')
    if (error) {
      this.errorMessage = error?.message!;
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
