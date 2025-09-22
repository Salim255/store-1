import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { User } from "../../users/model/user.model";

export type AuthStatusPayload = {
  status: string,
  data : {
    authenticated: boolean,
    id: string,
  }
}

export type AuthResponsePayload = {
  status: 'success',
  data: {
    user: User,
  }
}

@Injectable({providedIn: 'root'})
export class AuthHttpService {
  private ENV = environment;
  private baseUrl = `${this.ENV.apiUrl}/users`;

  constructor(private httpClient: HttpClient ){}

  register(data: any): Observable<HttpResponse<AuthResponsePayload>>{
    return this.httpClient.post<AuthResponsePayload>(
        `${this.baseUrl}`,
        data,
        { observe: 'response',       // gives full HTTP response
          withCredentials: true      // ensures cookies are included/stored
        },
    );
  }

  signIn(data: any): Observable<HttpResponse<AuthResponsePayload>>{
    return this.httpClient.post<AuthResponsePayload>(`${this.baseUrl}/sign-in`,
      data,
      {
        observe: 'response',       // gives full HTTP response
        withCredentials: true      // ensures cookies are included/stored
      }
    );
  }
  authStatus(): Observable<AuthStatusPayload>{
    return this.httpClient.get<AuthStatusPayload>(
      `${this.ENV.apiUrl}/auth/status`, { withCredentials: true },
    )
  }
}
