import { Component, Input, Output } from '@angular/core';
import { Product } from '../../types/product';
import { EventEmitter } from '@angular/core';
import { CartServiceService } from './../../services/cart-service.service';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() productsItems!: Product[];
  stars: number[] = [1, 2, 3, 4, 5];
  // cartItems!: Product[];
  @Output() productClicked = new EventEmitter<number>();
  @Output() addToCart = new EventEmitter<number>();

  handleRedirectToDetails(id: number) {
    this.productClicked.emit(id);
  }
  handleRedirectToCart(id: number) {
    this.addToCart.emit(id);
  }
}
