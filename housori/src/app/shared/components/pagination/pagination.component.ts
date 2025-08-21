import { Component, Input, signal } from "@angular/core";
import { ApiMetaData } from "src/app/features/products/services/products-http.service";

@Component({
  selector: 'app-pagination',
  templateUrl: "./pagination.component.html",
  styleUrls: ['./pagination.component.scss'],
  standalone: false,
 })

 export class PaginationComponent {
  @Input() pages: any [] = [];
  @Input() pagination!: ApiMetaData['pagination'];
  currentPage = signal<number>(1);
  goToPrevPage(): void {
  if (this.currentPage() <= 1) return;
    this.currentPage.set(this.currentPage() - 1);
   // this.fetchProducts();
  }

  goToNextPage(): void{
    if (
      !this.pagination?.pageCount
      || this.currentPage() >= this.pagination?.pageCount
    ) return;
    this.currentPage.set(this.currentPage() + 1);
    //this.fetchProducts();
  }

  goToPage(page: number): void {
    if (this.currentPage() === page) return;
    this.currentPage.set(page);
   //this.fetchProducts();
  }
 }
