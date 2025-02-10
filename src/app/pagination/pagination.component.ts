import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../types/product';
import { ProductRequestService } from '../services/product/product-request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  products: Product[] = [];
  pageRange: number[] = [];
  currentPage: number = 1;
  @Output() sendCurrentPage = new EventEmitter<number>();
  @Output() sendLimitOfProducts = new EventEmitter<number>();
  @Input() totalPages!: number;
  constructor(private productRequest: ProductRequestService) {}
  ngOnChanges() {
    console.log('Page and limit changes');
    this.currentPage = 1;
    this.sendCurrentPage.emit(this.currentPage);
    this.pageRange = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pageRange.push(i);
    }
    console.log(this.pageRange);
  }

  goToPage(page: number) {
    this.currentPage = page;
    console.log(this.currentPage);
    this.sendCurrentPage.emit(this.currentPage);
  }
}
