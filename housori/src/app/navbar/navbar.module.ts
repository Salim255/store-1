import { NgModule } from "@angular/core";
import { NavbarRoutingModule } from "./navbar-routing.module";
import { AuthModule } from "../features/auth/auth.module";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar.component";
import { IonicModule } from "@ionic/angular";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@NgModule({
  imports:[
    NavbarRoutingModule,
    AuthModule,
    CommonModule,
    IonicModule.forRoot(),
  ],
  declarations: [SidebarComponent, NavbarComponent ]
})
export class NavbarModule { }
