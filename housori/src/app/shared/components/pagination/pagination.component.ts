import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, signal, SimpleChanges } from "@angular/core";
import { ApiMetaData } from "src/app/features/products/services/products-http.service";
import { PaginationService } from "./pagination-service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-pagination',
  templateUrl: "./pagination.component.html",
  styleUrls: ['./pagination.component.scss'],
  standalone: false,
 })

 export class PaginationComponent implements OnChanges, OnDestroy{
  @Input() pages: any [] = [];
  @Input() pagination!: ApiMetaData['pagination'];
  @Output() goToPageEmitter = new EventEmitter<{ pageNumber: number }>();
  @Output() goToPrevPageEmitter = new EventEmitter();
  @Output() goToNextPageEmitter = new EventEmitter();

  currentPageSubscription!: Subscription;
  currentPage = signal<number>(1);
  constructor(private paginationService: PaginationService){}

  ngOnChanges(changes: SimpleChanges): void {
    this.subscribeToCurrentPage();
  }
  subscribeToCurrentPage() {
    this.currentPageSubscription = this.paginationService
      .getCurrentPage.
      subscribe(currentPage => {
        if (!currentPage) return;
        this.currentPage.set(currentPage);
        })
  }

  goToPrevPage(): void {
    this.goToPrevPageEmitter.emit();
  }

  goToNextPage(): void{
    this.goToNextPageEmitter.emit();
  }

  goToPage(page: number): void {
    this.goToPageEmitter.emit({ pageNumber: page });
  }

  ngOnDestroy(): void {
    this.currentPageSubscription?.unsubscribe();
  }
 }
