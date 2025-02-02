import { Component } from '@angular/core';
import { CartServiceService } from './../services/cart-service.service';
import { Product } from './../types/product';
import { CommonModule } from '@angular/common';
import { DiscountPipe } from '../pipes/discount.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, DiscountPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: Product[] = [];
  totalPrice: number = 0;
  tax: number = 0;
  finalPrice: number = 0;
  shipping: number = 0;
  constructor(
    private cartService: CartServiceService,
    private router: Router
  ) {}
  ngOnInit() {
    this.cartService.getCart().subscribe((cartItems) => {
      this.cartItems = cartItems;
      console.log(cartItems);
    });
    this.cartService.getTotalCost().subscribe((totalPrice) => {
      this.totalPrice = +totalPrice.toFixed(2);
      this.shipping = this.totalPrice ? 5 : 0;
       this.tax = Number((this.totalPrice * 0.1).toFixed(2));
      this.finalPrice =
        Number((this.totalPrice + this.tax).toFixed(2)) + this.shipping;
    });
  }

  removeProduct(id: number) {
    const updatedCart = this.cartItems.filter((item) => item.id !== id);
    this.cartService.changeCart(updatedCart);
  }
  productDetails(id: number) {
    this.router.navigate([`/product-details/${id}`]);
  }
  decreaseQuantity(productId: number) {
    const product = this.cartItems.find((p) => p.id === productId);
    if (product) {
      product.quantity = product.quantity ?? 1;
      if (product.quantity > 1) {
        product.quantity--;
        this.cartService.changeCart(this.cartItems);
      }
    }
  }
  increaseQuantity(productId: number) {
    const product = this.cartItems.find((p) => p.id === productId);
    if (product) {
      product.quantity = product.quantity ?? 1;
      if (product.quantity < product.stock) {
        product.quantity++;
        this.cartService.changeCart(this.cartItems);
      }
    }
  }
}
