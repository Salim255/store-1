import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthFormComponent } from "./components/auth-form/auth-form.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
 imports: [
  CommonModule,
  IonicModule,
  ReactiveFormsModule
],
 declarations: [
  AuthComponent,
  AuthFormComponent,
  LoginComponent,
  RegisterComponent,
],
 exports: [AuthComponent]
})

export class AuthModule {}
