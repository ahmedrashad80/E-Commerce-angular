import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartServiceService } from './../services/cart-service.service';
import { Product } from '../types/product';
@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor(private cartService: CartServiceService) {}
  cartItems: Product[] = [];
  ngOnInit() {
    this.cartService.getCart().subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }
}
