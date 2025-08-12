import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import Stripe from "stripe";
import { CartDetails } from "../../cart/services/cart-service";

export interface CreatedSessionResponse {
  status: 'success';
  data: {
    session: Stripe.Response<Stripe.Checkout.Session>;
  }
}

export interface CheckoutPayload {
  order: CartDetails;
  shippingAddress: ShippingAddress
}

export interface ShippingAddress {
    country: string;
    fullname: string;
    city: string;
    postalCode: string;
    phone: string;
    address: string;
  }

@Injectable({providedIn: 'root'})
export class CheckoutHttpService {
  private ENV = environment;
  private baseUrl = `${this.ENV.apiUrl}/payments`
  constructor(private httpClient: HttpClient){}

  createCheckoutSession(checkoutPayload: CheckoutPayload): Observable<HttpResponse<CreatedSessionResponse>>{
    return this.httpClient.post<CreatedSessionResponse>(`${this.baseUrl}`, { checkoutPayload },
      {
        observe: 'response',       // gives full HTTP response
        withCredentials: true      // ensures cookies are included/stored
      },
    );
  }
}
