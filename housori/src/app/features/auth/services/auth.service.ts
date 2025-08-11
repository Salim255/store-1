import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";
import { AuthHttpService, AuthResponsePayload } from "./auth-http.service";
import { HttpResponse } from "@angular/common/http";

export enum AuthType {
  LOGIN = 'log-in',
  SIGNUP = 'sign-up',
  GUEST = 'guest',
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private authTypeSubject = new BehaviorSubject<AuthType>(AuthType.GUEST);

  constructor(private authHttpService: AuthHttpService ){}

  register(data: any): Observable<HttpResponse<AuthResponsePayload>>{
    return this.authHttpService.register(data);
  }

  signIn(data: any): Observable<HttpResponse<AuthResponsePayload>>{
    return this.authHttpService.signIn(data).pipe(
      tap((response) => {
        if (response.body?.data.user) {
          //this.userAuth.next('authenticated');
        }
      }),
      catchError((err) => {
        // Re-throw the error to let subscribers handle it if needed
        return throwError(() => err);
      })
    );
  }

  get userIsAuthenticated(): Observable<boolean> {
     return this.authHttpService.authStatus().pipe(
      map((response) => {
        return response.data.authenticated;
      })
    )
  }

  setAuthType(authType: AuthType ): void{
    this.authTypeSubject.next(authType);
  }

  get getAuthType(): Observable<AuthType >{
    return this.authTypeSubject.asObservable();
  }
}
