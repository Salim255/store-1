import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";
import { AuthHttpService, AuthResponsePayload } from "./auth-http.service";
import { UserAuthentication } from "../model/auth-model";
import { HttpResponse } from "@angular/common/http";

export enum AuthType {
  LOGIN = 'log-in',
  SIGNUP = 'sign-up',
  GUEST = 'guest',
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private userAuth = new BehaviorSubject< 'authenticated' | null>(null);
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
       // this.userAuth.next(null);
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

  get userId(): Observable<string | null>{
    return this.userAuth.asObservable().pipe(
      map((data )=> data ?? null)
    )
  }

  private autoLogout(): void {
    this.logout();
  }

  async logout(): Promise<void>{
    this.userAuth.next(null);
  }

  autoLogin(): Observable<boolean>{
    return this.authHttpService.authStatus().pipe(
      map((response) => {
        const authStatus: boolean = response.data.authenticated;
        const buildUserAuth = new UserAuthentication(response.data.id, new Date());

        if (!response.data.authenticated) {
          this.autoLogout();
          return authStatus;
        };
        return authStatus;
      })
    )
  }

  setAuthType(authType: AuthType ): void{
    this.authTypeSubject.next(authType);
  }


  testAuth(){
    return this.authHttpService.authStatus().pipe(
      map((response) => {
        console.log(response);
        return response.data.authenticated;
      })
    )
  }

  get getAuthType(): Observable<AuthType >{
    return this.authTypeSubject.asObservable();
  }
}
