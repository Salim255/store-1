import { Injectable } from "@angular/core";
import { CheckoutHttpService, CreatedSessionResponse } from "./checkout-http.service";
import { Observable, tap } from "rxjs";
import { loadStripe } from '@stripe/stripe-js';
import { environment } from "src/environments/environment";
import { HttpResponse } from "@angular/common/http";

@Injectable({providedIn: 'root'})

export class CheckoutService {
  private ENV = environment;

  constructor(private checkoutHttpService: CheckoutHttpService){}

  checkoutPayment(items: any): Observable<HttpResponse<CreatedSessionResponse>>{
    return this.checkoutHttpService.createCheckoutSession(items).pipe(
      tap((session)=> {
        console.log(session.body?.data.session.id)
        if (session.body?.data.session.id) {
          this.startCheckout(session.body?.data.session.id);
        }

      })
    );
  }

 private async startCheckout(sessionId: string) {
    const stripeJS = await loadStripe(this.ENV.stripePK);
    if (!stripeJS) {
      console.error('Stripe.js failed to load');
      return;
    }
    const { error } = await stripeJS.redirectToCheckout({ sessionId });
    if (error) {
      console.error('Stripe redirect error:', error);
    }
  }
}
