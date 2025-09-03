import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn: 'root'})

export class SpinnerService {
  private loadingCount = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(){}
  showSpinner(){

  }

  hideSpinner(){

  }

  get isLoading():Observable<boolean> {
    return this.loadingSubject.asObservable();
  }
}
