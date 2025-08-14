import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class CoreService {
  constructor(){}
  setDisableScroll(disable: boolean) {
      document.body.style.overflow = disable ? 'hidden' : 'auto';
    }
}
