import { Component } from "@angular/core";
import { NavbarService } from "../../services/navbar.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false,
})

export class SidebarComponent {
  constructor(private navbarService: NavbarService){}

  onClose(){
    this.navbarService.onCloseSideBar();
  }
}
