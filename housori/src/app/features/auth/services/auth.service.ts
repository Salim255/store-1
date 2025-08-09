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
    const expirationTime = new Date(new Date().getTime() + +authData.expireIn);
    const builder = new UserAuthentication( authData._id, expirationTime);
    this.userAuth.next(builder);

  }

  setAuthType(authType: AuthType ){
    this.authTypeSubject.next(authType);
  }

  get getAuthType(): Observable<AuthType >{
    return this.authTypeSubject.asObservable();
  }
}
