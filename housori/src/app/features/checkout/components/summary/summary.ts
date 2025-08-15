import { Component } from "@angular/core";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.html',
  styleUrls: ['./summary.scss'],
  standalone: false,
})

export class SummaryComponent {
 cartItems = [1,2];
  constructor() {}

  ngOnInit(): void {

  }

}
