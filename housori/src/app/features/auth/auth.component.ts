import { Component, OnInit, signal } from "@angular/core";
import { AuthService, AuthType } from "./services/auth.service";
import { Subscription } from "rxjs";
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: false,
})

export class AuthComponent implements OnInit {
  authType = signal<AuthType>(AuthType.GUEST) ;
  private authTypeSubscription!: Subscription;
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  subscribeToAuthType(): void{
    this.authTypeSubscription = this.authService.getAuthType.subscribe((authType) => {
      this.authType.set(authType);
    })
  }

  get switchTo(): string {
    return this.authType() ===  AuthType.LOGIN ? 'Login' : 'Register' ;
  }

  onSwitch(){
    if (this.authType() ===  AuthType.LOGIN) {
      this.authType.set(AuthType.SIGNUP);
    } else {
      this.authType.set(AuthType.LOGIN);
    }

  }
  ngOnDestroy(): void {
    this.authTypeSubscription?.unsubscribe
  }
}
