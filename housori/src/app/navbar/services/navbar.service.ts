import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})

export class NavbarService {

  constructor(){}

  onCloseSideBar(): void{
    console.log('Close sidebar')
  }
}
