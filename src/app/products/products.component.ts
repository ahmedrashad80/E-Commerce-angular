import { Component } from '@angular/core';
import data from '../../products.json';
import { CardComponent } from './card/card.component';
import { Product } from '../types/product';
import { Router } from '@angular/router';
import { CartServiceService } from './../services/cart-service.service';
import { ProductRequestService } from '../services/product/product-request.service';

@Component({
  selector: 'app-products',
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  // products: Product[] = data.products;
  products: Product[] = [];
  cartItems: Product[] = [];
  quantity!: number;

  constructor(
    private router: Router,
    private cartService: CartServiceService,
    private productRequest: ProductRequestService
  ) {}

  productId(id: number) {
    // console.log(id);

    const product = this.products.find((p) => p.id === id);
    console.log(product);
    this.router.navigate([`/product-details/${id}`]);
  }
  ngOnInit() {
    this.productRequest.getProducts().subscribe((res) => {
      console.log(res.products);
      this.products = res.products;
    });
    this.cartService.getCart().subscribe((cart) => {
      this.cartItems = cart;
    });
  }

  addCart(id: number) {
    const product = this.products.find((p) => p.id === id);
    const existingIntoCart = this.cartItems.find((c) => c.id === id);

    if (product) {
      product.addedToCart = true;
      if (existingIntoCart) {
        existingIntoCart.quantity = (existingIntoCart.quantity || 0) + 1;
      } else {
        product.quantity = 1;
        this.cartItems.push({ ...product, quantity: 1 });
      }
    }
    console.log(this.cartItems);
    this.cartService.changeCart(this.cartItems);
  }
}
