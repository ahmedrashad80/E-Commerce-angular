import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartServiceService } from './../services/cart-service.service';
@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor(private cartService: CartServiceService) {}
  cart = 0;
  ngOnInit() {
    this.cartService.getCartNumber().subscribe((cartItems) => {
      this.cart = cartItems;
    });
  }
}
