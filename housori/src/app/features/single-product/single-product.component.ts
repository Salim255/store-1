import { Component, signal } from "@angular/core";
import { Subscription } from "rxjs";
import { SingleProductService } from "../products/services/single-product.service";
import { Product } from "../products/model/product.model";


@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
  standalone: false,
})

export class SingleProductComponent{
  singleProduct = signal<Product | null>(null);
  private singleProductSubscription!: Subscription
  constructor(private singleProductService:  SingleProductService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subscribeToSingleProduct();
  }

  subscribeToSingleProduct(){
    this.singleProductSubscription = this.singleProductService.getClickedProduct.subscribe(clickedProduct => {
      this.singleProduct.set(clickedProduct);

    })
  }

  // dans le component
  get firstImage(): string {
    const prod = this.singleProduct();
    return prod?.images?.[0] ?? '';
  }

  get productPrice(): number | '' {
    const prod = this.singleProduct();
    return prod?.price ?? '';
  }

  get description(): string {
    const prod = this.singleProduct();
    return prod?.description ?? '';
  }
  get title(): string {
      const prod = this.singleProduct();
      return prod?.name ?? ''
  }
  /* "https://images.unsplash.com/photo-1537726235470-8504e3beef77?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMwfHxkaW5pbmclMjB0YWJsZXxlbnwwfHwwfHx8MA%3D%3D" */
}
