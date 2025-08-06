import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export enum AuthType {
  LOGIN = 'log-in',
  SIGNUP = 'sign-up',
  GUEST = 'guest',
}
@Injectable({providedIn: 'root'})
export class AuthService {
  private authTypeSubject = new BehaviorSubject<AuthType>(AuthType.GUEST);

  setAuthType(authType: AuthType ){
    this.authTypeSubject.next(authType);
  }

  get getAuthType(): Observable<AuthType >{
    return this.authTypeSubject.asObservable();
  }
}
