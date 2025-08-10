import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './features/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  authSubscription!: Subscription;
  previousAuthSate: boolean = false;
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.subscribeToAuth();
  }

  private subscribeToAuth(){
    this.authSubscription = this.authService.userIsAuthenticated.subscribe(auth => {
      console.log(auth, this.previousAuthSate);
      //Updates only when auth changes to false (unauthenticated).
      // Will not update if auth changes to true
      if(!auth && this.previousAuthSate !== auth) {
        this.previousAuthSate = auth;
      }
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.authSubscription?.unsubscribe();
  }
}
