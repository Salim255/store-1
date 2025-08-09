import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { AuthHttpService } from "./auth-http.service";
import { UserAuthentication } from "../model/auth-model";

export enum AuthType {
  LOGIN = 'log-in',
  SIGNUP = 'sign-up',
  GUEST = 'guest',
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private userAuth = new BehaviorSubject<UserAuthentication | null>(null);
  private authTypeSubject = new BehaviorSubject<AuthType>(AuthType.GUEST);

  constructor(private authHttpService: AuthHttpService ){}

  setAuthData(authData: { _id : string, expireIn: string } ): void {
    const expirationTime = new Date(new Date().getTime());
    const builder = new UserAuthentication( authData._id, expirationTime);
    this.userAuth.next(builder);
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
      map((data )=> data?.userId ?? null)
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
        this.userAuth.next(buildUserAuth);
        return authStatus;
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
