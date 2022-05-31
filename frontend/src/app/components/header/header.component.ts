import { Component, OnInit } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartNumber: number = 0;
  isAuthenticated: boolean = true;

  //icons
  cart = faCartShopping;

  constructor(private cartServ: CartService) {}

  ngOnInit(): void {
    this.cartServ.cartList$.subscribe((cart) => {
      this.cartNumber = cart.length;
    });
  }

  logout() {
    console.log('logged out');
    
  }
}
