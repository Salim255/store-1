import { Component } from "@angular/core";

@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.scss"],
  standalone: false
})

export class ProductsListComponent {
  products = [
    {image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGRpbmluZyUyMHRhYmxlfGVufDB8fDB8fHww",name: "Product 1", description: "Product 1", price: 23},
    {image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGRpbmluZyUyMHRhYmxlfGVufDB8fDB8fHww",name: "Product 2", description: "Product 2", price: 23},
    {image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGRpbmluZyUyMHRhYmxlfGVufDB8fDB8fHww",name: "Product 3", description: "Product 3", price: 23}
  ];
  constructor() {}
}
