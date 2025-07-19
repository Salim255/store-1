import { Component, signal } from "@angular/core";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
  standalone: false
})

export class FilterComponent {
  products = ['Laptop', 'Phone', 'Headphones']; // Example

  selectedProduct = '';
  customPopoverOptions = {
    cssClass: 'custom-popover'
  };

  companyValue = signal<string>("all");
  categoryValue = signal<string>("all");
  sortValue = signal<string>("all");

  categoryOptions = ['brown', 'blonde', 'Red'];
  companyOptions = ['brown', 'blonde', 'Red'];
  sortOptions = ['brown', 'blonde', 'Red'];
  constructor(){}

  onCategoryChange(event: any){
    const value = event.detail.value;
    if (value) this.categoryValue.set(value);
    console.log(event.detail.value)
  }

  onCompanyChange(event: any){
    const value = event.detail.value;
    if (value) this.companyValue.set(value);
    console.log(event.detail.value)
  }

  onSortChange(event: any){
    const value = event.detail.value;
    if (value) this.sortValue.set(value);
    console.log(event.detail.value)
  }

}
