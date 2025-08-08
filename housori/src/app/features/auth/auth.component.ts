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
  validForm = signal<boolean>(false);
  authType = signal<AuthType>(AuthType.GUEST) ;
  private authTypeSubscription!: Subscription;
  private formValidationSubscription!: Subscription;
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subscribeToAuthType();
    this.subscribeToFormValidation();
  }

  subscribeToFormValidation(){
    this.formValidationSubscription =
    this.authService.getAuthFormValidationStatus.subscribe(status => {
      console.log(status, "heyy status")
      this.validForm.set(status);
    })
  }
  subscribeToAuthType(): void{
    this.authTypeSubscription =
      this.authService.getAuthType.subscribe((authType) => { this.authType.set(authType) })
  }

  get switchTo(): string {
    return this.authType() ===  AuthType.LOGIN ? 'Register': 'Login';
  }

  get getCurrentAuthType(): string{
    return this.authType() ===  AuthType.LOGIN ? 'Login': 'Register';
  }

  onGuest(): void{
    this.authService.setAuthType(AuthType.GUEST);
  }

  onSwitch(): void{
    if (this.authType() ===  AuthType.LOGIN) {
      this.authService.setAuthType(AuthType.SIGNUP);
    } else {
      this.authService.setAuthType(AuthType.LOGIN);
    }
  }

  ngOnDestroy(): void {
    this.authTypeSubscription?.unsubscribe();
    this.formValidationSubscription?.unsubscribe();
  }
}
