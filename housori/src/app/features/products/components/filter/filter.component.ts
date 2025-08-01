import { Component, signal } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { single } from "rxjs";

export  type EditProfilePayload = {
  search: string;
  category: string;
  company:  string;
  sortBy: string;
  price: number;
}


@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
  standalone: false
})

export class FilterComponent {
  products = ['Laptop', 'Phone', 'Headphones']; // Example
  filterFormFields!: FormGroup;
  selectedProduct = '';
  customPopoverOptions = {
    cssClass: 'custom-popover'
  };

  companyValue = signal<string>("all");
  categoryValue = signal<string>("all");
  sortValue = signal<string>("all");
  priceValue = signal<number>(10000);
  shippingValue = signal<boolean>(false);

  categoryOptions = ['Chairs', 'Tables', 'Beds', 'Sofas'];
  companyOptions = ['Savanna Craft', 'Elevara Home', 'IvoryNest', 'Tusker Living', 'Luxora'];
  sortOptions = ['a-z', 'z-a', 'high', 'low'];
  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.buildForm();
    this.listenToFormChange();
  }

  submitSearch(){
    console.log(this.filterFormFields)
  }
  resetFilter(){
    this.filterFormFields.reset();
    this.categoryValue.set('all');
    this.companyValue.set('all');
    this.sortValue.set('all');
    this.priceValue.set(1000000);
  }

  buildForm(): void{
    this.filterFormFields = this.formBuilder.group({
      search: [null],
      category: ['all'],
      company: ['all'],
      sortBy: ['all'],
      price: [null],
      shipping: [null],
    });
  }

  listenToFormChange(): void{
    this.filterFormFields.get('category')?.valueChanges.subscribe(value => {
      this.categoryValue.set(value);
    });

    this.filterFormFields.get('company')?.valueChanges.subscribe(value => {
      this.companyValue.set(value);
    });

    this.filterFormFields.get('sortBy')?.valueChanges.subscribe(value => {
      this.sortValue.set(value);
    })

    this.filterFormFields.get('price')?.valueChanges.subscribe(value => {
      this.priceValue.set(value);
    })

     this.filterFormFields.get('shipping')?.valueChanges.subscribe(value => {
      this.shippingValue.set(value);
    })

  }
}
