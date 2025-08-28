import { Component, Input } from "@angular/core";
import { Product } from "../../model/product.model";


@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss'],
  standalone: false,
})

export class GalleryItemComponent {
  @Input() product!: Product;
}
