import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss'],
  standalone: false,
})

export class ListHeader {
  headerItems = ['qty', 'unit price', 'amount', 'date']
}
