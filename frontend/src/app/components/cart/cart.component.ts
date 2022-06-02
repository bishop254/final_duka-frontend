import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartArray: Array<any> = [];
  total!: number;

  //icons
  trash = faTrash;

  constructor(private cartServ: CartService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartServ.cartList$.subscribe((resp) => {
      this.cartArray = resp;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = 0;
    this.cartArray.map((product: any) => {
      this.total += product.price;
    });
  }

  removeItem(product: any) {
    this.cartServ.removeCartItem(product);
    this.calculateTotal();
  }

  emptyCart() {
    this.cartArray.length = 0;
    this.cartServ.emptyCart();
  }
}
