import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './../types/product';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  private cart = new BehaviorSubject<Product[]>([]);
  private cartNumber = new BehaviorSubject<number>(0);
  private totlaCost = new BehaviorSubject<number>(0);
  constructor() {}
  getCart() {
    return this.cart.asObservable();
  }
  getCartNumber() {
    return this.cartNumber.asObservable();
  }
  getTotalCost() {
    return this.totlaCost.asObservable();
  }

  changeCart(newValue: Product[]) {
    this.cartNumber.next(
      newValue.reduce((sum, item) => sum + (item.quantity || 0), 0)
    );
    this.totlaCost.next(
      newValue.reduce(
        (sum, item) =>
          sum +
          ((item.quantity ?? 0) *
            item.price *
            (1 - item.discountPercentage / 100) || 0),
        0
      )
    );
    this.cart.next(newValue);
  }
}
