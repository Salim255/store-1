import { Injectable } from "@angular/core";
import { Appearance } from "@stripe/stripe-js";

@Injectable({providedIn: 'root'})
export class PaymentService {
  appearance: Appearance = {
   theme: 'stripe',
   variables: {
      colorPrimary: '#0E766E',
      colorBackground: '#FFFFFF',
      colorText: '#042321s',
      colorDanger: '#eb7769',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '10px',
      // See all possible variables below

      gridColumnSpacing: '10px',
      gridRowSpacing: '1rem',
      fontLineHeight: '1.5',
      fontSizeBase: '1rem',
      fontWeightNormal: '400',
    },
    rules: {
        '.Label': {
          fontWeight: '600',
          color: '#042321s',
          fontSize: '1.2rem',
        },
        '.Input': {
          colorText: '#042321s',
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


  get getAppearance() {
    return this.appearance;
  }
}
