import { NgModule } from "@angular/core";
import { NavbarRoutingModule } from "./navbar-routing.module";
import { AuthModule } from "../features/auth/auth.module";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar.component";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports:[
    NavbarRoutingModule,
    AuthModule,
    CommonModule,
    IonicModule.forRoot(),
  ],
  declarations: [ NavbarComponent ]
})
export class NavbarModule { }
