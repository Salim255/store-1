import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";

export enum AuthType {
  LOGIN = 'log-in',
  SIGNUP = 'sign-up',
  GUEST = 'guest',
}
@Injectable({providedIn: 'root'})
export class AuthService {
  private authTypeSubject = new BehaviorSubject<AuthType>(AuthType.GUEST);
  private authFormValidationSubject = new BehaviorSubject<'VALID' | 'INVALID'>('INVALID');

  setAuthType(authType: AuthType ){
    console.log('uptate auth')
    this.authTypeSubject.next(authType);
  }

  setFormValidationStatus(status: 'VALID' | 'INVALID'){
    this.authFormValidationSubject.next(status)
  }

  get getAuthFormValidationStatus(): Observable<boolean> {
    return this.authFormValidationSubject.asObservable().pipe(
      map((status) => status === 'VALID')
    );
  }

  get getAuthType(): Observable<AuthType >{
    return this.authTypeSubject.asObservable();
  }
}
