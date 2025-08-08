import { Component, Input, OnChanges, signal, SimpleChanges } from "@angular/core";
import { AuthType } from "../../services/auth.service";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn  } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Subscription } from "rxjs";

const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirm = group.get('passwordConfirm')?.value;

  return password && confirm && password !== confirm
    ? { passwordsMismatch: true }
    : null;
};

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  standalone: false
})
export class AuthFormComponent implements OnChanges {
  @Input() authType!: AuthType;

  passwordMismatchLive = signal<boolean>(false);
  authFormFields!: FormGroup;
  private previousState: 'VALID' | 'INVALID' = 'INVALID';
  private statusSub?: Subscription;
  private validationSub!: Subscription;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['authType']){
      this.buildForm();
      this.subscribeToStatusChange();
      this.listenToPasswordConfirm();
    }

  }

  buildForm(): void {
    this.previousState = 'INVALID';
     this.authService.setFormValidationStatus('INVALID');
    this.authFormFields = this.formBuilder.group(
      this.formFields(),
      { validators: passwordMatchValidator },
    );
  }

  formFields() {
    if (this.authType === AuthType.LOGIN) {
      return {
        email: [
          this.authFormFields?.get('email')?.value ||null,
          [Validators.required, Validators.email],
        ],
        password: [
          this.authFormFields?.get('password')?.value || null,
          Validators.required,
        ],
      }
    } else {
      return  {
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        email: [
          this.authFormFields?.get('email')?.value || null,
          [Validators.required, Validators.email],
        ],
        password: [
          this.authFormFields?.get('password')?.value || null,
          Validators.required,
        ],
        passwordConfirm: [null, Validators.required],
      }
    }
  }

  subscribeToStatusChange(){
    this.statusSub?.unsubscribe();

    this.statusSub = this.authFormFields?.statusChanges.subscribe(status => {
      //VALID // INVALID
      if (this.previousState !== status)  {
        if (status === 'VALID' || status === 'INVALID') {
          this.authService.setFormValidationStatus(status);
          this.previousState = status;  // update previousState to avoid repeated calls
        }
      }
    })
  }

  listenToPasswordConfirm(): void{
    this.authFormFields.get('password')?.valueChanges.subscribe(value => {
      const passwordControl = this.authFormFields?.get('password')?.value?.trim();
      const confirmControl = this.authFormFields?.get('passwordConfirm')?.value?.trim();

      // 1 P1 = NULL & P2 = NULL;
      if (!passwordControl && !confirmControl) {
          console.log('Hello ',!confirmControl, !passwordControl)
        //console.log(!confirmControl, !confirmControl)
        this.passwordMismatchLive.set(false);
        return;
      }
      if (passwordControl && !confirmControl) {
          this.passwordMismatchLive.set(false);
          return;
          //this.checkPasswordMismatch(passwordControl.value, confirmControl.value);
      }
      if (!passwordControl && confirmControl){
         this.passwordMismatchLive.set(true);
         return;
      }
      if (passwordControl && confirmControl){
        if(passwordControl.length  === confirmControl.length) {
          const result = passwordControl === confirmControl;
          console.log(result);
          this.passwordMismatchLive.set(!result);
          return ;
        }
        if (passwordControl.length  !== confirmControl.length){
            this.passwordMismatchLive.set(true);
            return;
        }
      }
    })
    this.authFormFields?.get('passwordConfirm')?.valueChanges.subscribe(value => {
      const passwordControl = this.authFormFields?.get('password')?.value?.trim();
      const confirmControl = this.authFormFields?.get('passwordConfirm')?.value?.trim();


      // 1 P1 = NULL & P2 = NULL;
      if (!passwordControl && !confirmControl) {
          console.log('Hello ',!confirmControl, !passwordControl)
        //console.log(!confirmControl, !confirmControl)
        this.passwordMismatchLive.set(false);
        return;
      }
      if (passwordControl && !confirmControl) {
          this.passwordMismatchLive.set(false);
          return;
          //this.checkPasswordMismatch(passwordControl.value, confirmControl.value);
      }
      if (!passwordControl && confirmControl){
         this.passwordMismatchLive.set(true);
         return;
      }
      if (passwordControl && confirmControl){
        if(passwordControl.length  === confirmControl.length) {
          const result = passwordControl === confirmControl;
          console.log(result);
          this.passwordMismatchLive.set(!result);
          return ;
        }
        if (passwordControl.length  !== confirmControl.length){
            this.passwordMismatchLive.set(true);
            return;
        }
      }
    })
  }



  get passwordsMismatch(): boolean {
    return  this.passwordMismatchLive();
  }
  get isLogin(): boolean {
    return this.authType === AuthType.LOGIN ;
  }
}
