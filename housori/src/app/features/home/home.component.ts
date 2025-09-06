import { Component, OnInit } from "@angular/core";
import { HomeService } from "./services/home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit {
  homeHeader: string ="";
  description: string = "";
  constructor(private homeService : HomeService ){}

  ngOnInit(): void {
    this.homeHeader = this.homeService.homeHeader;
    this.description = this.homeService.homeDescription;
  }
}
