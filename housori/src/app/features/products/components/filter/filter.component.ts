import { Component } from "@angular/core";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
  standalone: false
})

export class FilterComponent {
  products = ['Laptop', 'Phone', 'Headphones']; // Example
  selectedProduct = '';
}
