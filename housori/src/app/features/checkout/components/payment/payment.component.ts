import { Component, Input, OnInit } from '@angular/core';
import {
  Appearance,
  Stripe,
  StripePaymentElement,
  StripePaymentElementOptions,
  loadStripe,
} from '@stripe/stripe-js';
import { TotalOrderDetails } from 'src/app/shared/components/order-total/order-total.component';
import { environment } from 'src/environments/environment';
import { CheckoutService } from '../../services/checkout.service';
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";

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
  paymentElement: StripePaymentElement | null = null;
  billingAddressElement: any = null;
  shippingAddressElement: any = null;
  checkout: any;
  errorMessage: string = '';
  isLoading: boolean = false;
  stripeReady: boolean = false;
  clientSecretSubscription!: Subscription;
  private clientSecret: string | null = null;

  constructor(
    private router: Router,
    private checkoutService: CheckoutService,
  ) {}

  async ngOnInit() {
    this.stripe = await loadStripe(`${this.ENV.stripePK}`); // Replace with your Stripe publishable key
    if (!this.stripe) {
      return;
    }

    this.subscribeToClientSecret();
  }

  subscribeToClientSecret(){
     this.clientSecretSubscription = this.checkoutService.getClientSecret.subscribe((clientSecret) => {
      if (clientSecret) {
        this.clientSecret = clientSecret;
        this.paymentElementWithCheckout();
      }
    });
  }
  async paymentElementWithCheckout(){
    if (!this.clientSecret) return;
      this.checkout = await this.stripe!.initCheckout({
      fetchClientSecret: () => this.clientSecret,
      elementsOptions: {
        appearance
      }
    } as any);

    this.paymentElement =
      this.checkout.createPaymentElement(
          { layout: {
              type: 'tabs', // or 'accordion'
            },
          },
      );

    this.paymentElement!.mount('#payment-element');
    this.stripeReady = true;
  }

  async handleSubmitWithCheckout() {
    this.isLoading = true;
    this.errorMessage = '';
    const result =
      await this.checkout!.confirm({ redirect: 'if_required' });
    if ( result.error) {
      this.errorMessage =  result.error?.message!;
    }

    setTimeout(() => {
      this.isLoading = false;
      this.checkoutService.setOrderIsPlaced(false);
      this.clientSecretSubscription?.unsubscribe();
      this.clientSecret = null;
      this.paymentElement?.unmount();
      this.paymentElement = null;
      this.stripeReady = false;
      this.checkout = null;
      this.stripe = null;
      this.router.navigate(['/orders']);
    }, 1000);

  }
}
