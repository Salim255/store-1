import { NgModule } from "@angular/core";
import { NavbarRoutingModule } from "./navbar-routing.module";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar.component";
import { IonicModule } from "@ionic/angular";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports:[
    ToastrModule,
    NavbarRoutingModule,
    CommonModule,
    IonicModule.forRoot(),
  ],
  declarations: [SidebarComponent, NavbarComponent ]
})
export class NavbarModule { }
