import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import Stripe from "stripe";

export interface CreatedSessionResponse {
  status: 'success';
  data: {
    session: Stripe.Response<Stripe.Checkout.Session>;
  }
}

@Injectable({providedIn: 'root'})
export class CheckoutHttpService {
  private ENV = environment;
  private baseUrl = `${this.ENV.apiUrl}/payments`
  constructor(private httpClient: HttpClient){}

  createCheckoutSession(items: any): Observable<HttpResponse<CreatedSessionResponse>>{
    return this.httpClient.post<CreatedSessionResponse>(`${this.baseUrl}`, { items },
      {
        observe: 'response',       // gives full HTTP response
        withCredentials: true      // ensures cookies are included/stored
      },
    );
  }
}
