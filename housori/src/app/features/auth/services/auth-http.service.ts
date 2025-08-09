import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class AuthHttpService {
  private ENV = environment;
  private baseUrl = `${this.ENV.apiUrl}/users/sign-in`;

  constructor(private httpClient: HttpClient ){}
  register(data: any): Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}`,
      data,
      {
        observe: 'response',       // gives full HTTP response
        withCredentials: true      // ensures cookies are included/stored
      },
  );
  }

  signIn(data: any): Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}`,
      data,
      {
        observe: 'response',       // gives full HTTP response
        withCredentials: true      // ensures cookies are included/stored
      }
    );
  }
}
