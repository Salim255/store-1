import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn: 'root'})

export class NavbarService {
  private closeSidebarSubject = new BehaviorSubject<'close' | null>(null)
  constructor(){}

  onCloseSideBar(): void{
    this.closeSidebarSubject.next('close')
  }

  get getSidebarStatus(): Observable<'close' | null> {
    return this.closeSidebarSubject.asObservable();
  }
}
