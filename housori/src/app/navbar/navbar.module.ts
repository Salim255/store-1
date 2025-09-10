import { NgModule } from "@angular/core";
import { NavbarRoutingModule } from "./navbar-routing.module";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports:[
    NavbarRoutingModule,
    CommonModule,
    IonicModule
  ],
  declarations: [SidebarComponent, NavbarComponent ]
})
export class NavbarModule { }
