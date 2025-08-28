import { Component, Input } from "@angular/core";
import { Product } from "../../model/product.model";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  standalone: false
})

export class ListItemComponent {
  @Input() product!: Product;
}
