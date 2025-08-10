import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { AuthHttpService } from "./auth-http.service";

@Injectable({providedIn: 'root'})
export class AuthFormService {
  private submitFormSubject = new BehaviorSubject<'submit' | null>(null);
  private authFormValidationSubject = new BehaviorSubject<'VALID' | 'INVALID'>('INVALID');
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
