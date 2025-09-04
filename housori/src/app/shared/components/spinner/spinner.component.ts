import { Component, OnInit } from "@angular/core";
import { SpinnerService } from "../../services/spinner.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone: false,
})
export class SpinnerComponent {
  isLoading$ = this.spinnerService.isLoading;
  constructor(private spinnerService: SpinnerService){}
}
