import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import data from '../../products.json';
import { Product } from '../types/product';
import { DiscountPipe } from '../pipes/discount.pipe';
import { RatePipe } from '../pipes/rate.pipe';
import { CartServiceService } from './../services/cart-service.service';
import { ProductRequestService } from '../services/product/product-request.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, DiscountPipe, RatePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  @Input() id: string = '';
  // products: Product[] = data.products;
  products: Product[] = [];
  cartItems: Product[] = [];
  productId!: number;
  product!: Product | undefined;
  constructor(
    private cartService: CartServiceService,
    private productRequest: ProductRequestService
  ) {}

  ngOnInit(): void {
    this.productRequest.getOneProduct(this.id).subscribe((res) => {
      this.product = res;
      console.log('Product:', this.product);

      this.cartService.getCart().subscribe((cartItems) => {
        this.cartItems = cartItems;
        console.log('Cart Items:', this.cartItems);

        const index = this.cartItems.findIndex(
          (p: Product) => p.id === this.product?.id
        );

        if (index !== -1) {
          this.product = this.cartItems[index];
        }
        console.log('Final Product:', this.product);
      });
    });
  }

  addToCart(id: number) {
    const product = this.products.find((p) => p.id === id);
    const existingIntoCart = this.cartItems.find((c) => c.id === id);

    if (product) {
      product.addedToCart = true;
      if (existingIntoCart) {
        existingIntoCart.quantity = (existingIntoCart.quantity || 0) + 1;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
    }
    this.cartService.changeCart(this.cartItems);
  }
  decreaseOne(id: number) {
    const product = this.products.find((p) => p.id === id);
    const existingIntoCart = this.cartItems.find((c) => c.id === id);

    if (existingIntoCart) {
      if (
        existingIntoCart.quantity !== undefined &&
        existingIntoCart.quantity > 1
      ) {
        existingIntoCart.quantity = (existingIntoCart.quantity || 0) - 1;
        this.cartService.changeCart(this.cartItems);
      } else {
        existingIntoCart.quantity = 0;
        product!.addedToCart = false;
        this.cartItems = this.cartItems.filter((item) => item.id !== id);

        this.cartService.changeCart(this.cartItems);
      }
    }
  }

  increaseOne(id: number) {
    const product = this.products.find((p) => p.id === id);
    const existingIntoCart = this.cartItems.find((c) => c.id === id);

    if (product) {
      product.addedToCart = true;
      product.quantity = product.quantity || 0;
      if (existingIntoCart) {
        if ((existingIntoCart.quantity || 0) < existingIntoCart.stock) {
          existingIntoCart.quantity = (existingIntoCart.quantity || 0) + 1;
        }
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
    }

    this.product = this.cartItems.find((cartItem) => cartItem.id === +this.id);
    this.cartService.changeCart(this.cartItems);
  }
}
