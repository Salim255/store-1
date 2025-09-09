import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { AuthHttpService } from "./auth-http.service";

export type AuthField = {
  name: string;
  label: string;
  placeholder: string;
  type:  string;
  showIfLogin: boolean;
 }
@Injectable({providedIn: 'root'})
export class AuthFormService {
  private submitFormSubject = new BehaviorSubject<'submit' | null>(null);
  private authFormValidationSubject = new BehaviorSubject<'VALID' | 'INVALID'>('INVALID');

  // Define your form fields dynamically
  formFields = [
    { name: 'firstName', label: 'First name', placeholder: 'First name', type: 'text', showIfLogin: false },
    { name: 'lastName', label: 'Last name', placeholder: 'Last name', type: 'text', showIfLogin: false },
    { name: 'email', label: 'Your email', placeholder: 'Email', type: 'email', showIfLogin: true },
    { name: 'password', label: 'Password', placeholder: 'Password', type: 'password', showIfLogin: true },
    { name: 'passwordConfirm', label: 'Confirm password', placeholder: 'Confirm password', type: 'password', showIfLogin: false }
  ];

  constructor(private authHttpService: AuthHttpService){}


  setFormValidationStatus(status: 'VALID' | 'INVALID'){
    this.authFormValidationSubject.next(status)
  }

  get getAuthFormValidationStatus(): Observable<boolean> {
    return this.authFormValidationSubject.asObservable().pipe(
      map((status) => status === 'VALID')
    );
  }

  setSubmitFormSubject(submit: 'submit' | null): void{
    this.submitFormSubject.next(submit);
  }

  get getSubmitForm(): Observable<boolean>{
    return this.submitFormSubject.asObservable().pipe(
      map((value) => {
        return !!value;
      })
    )
  }
}
