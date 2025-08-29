import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomSelectComponent } from './custom-select.component';

@Injectable({ providedIn: 'root' })
export class CustomSelectService {
  private openSelectSubject = new BehaviorSubject<CustomSelectComponent | null>(null);

  open(select: CustomSelectComponent) {
    this.openSelectSubject.next(select);
  }

  close(select: CustomSelectComponent) {
    if (this.openSelectSubject.value === select) {
      this.openSelectSubject.next(null);
    }
  }

  get  getOpenSelectStatus(): Observable<CustomSelectComponent | null>{
    return  this.openSelectSubject.asObservable();
  }
}
