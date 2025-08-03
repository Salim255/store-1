import { HttpParams } from "@angular/common/http";
import { Component, signal } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProductsService } from "../../services/products.service";

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

  constructor(
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
  ){}

  ngOnInit(): void {
    this.buildForm();
    this.listenToFormChange();
  }

  submitSearch() {
    let params = new HttpParams();

    const price = this.filterFormFields.get('price')?.value;
    const search = this.filterFormFields.get('search')?.value;
    const company = this.filterFormFields.get('company')?.value
    const category = this.filterFormFields.get('category')?.value;
    const sort =  this.filterFormFields.get('sort')?.value;

    if (price) params = params.set('price[lte]', price.toString());
   if (search) params = params.set('search', search);
    if (company) params = params.set('company', company);
    if (category) params = params.set('category', category);
    if (sort) params = params.set('name', sort);

    //this.http.get(`${this.API_URL}/products`, { params }).subscribe();
    console.log(params)
    this.productsService.getAllProducts(params).subscribe();
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
      category: [null],
      company: [null],
      sortBy: [null],
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
