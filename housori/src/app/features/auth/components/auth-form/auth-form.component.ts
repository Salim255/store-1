import { Component, Input, SimpleChanges } from "@angular/core";
import { AuthType } from "../../services/auth.service";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  standalone: false
})

export class AuthFormComponent {
  @Input() authType!: AuthType;

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.authType, 'hello from authform')
  }
  get getAuthType(): boolean {
    return this.authType === AuthType.LOGIN ;
  }
}
