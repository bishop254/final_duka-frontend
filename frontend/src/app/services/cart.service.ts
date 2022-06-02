import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: Array<any> = [];

  //Define a BehaviorSubject to share cart state.
  private cartListSource = new BehaviorSubject<Array<any>>([]);
  cartList$ = this.cartListSource.asObservable();

  constructor(private notif: NotificationsService) {}

  updateCartList(product: any) {
    this.cartItems.push(...product); //Add our product to our array.
    this.cartListSource.next(this.cartItems); //Update our cart state to be the cartItems array.
    this.notif.showSuccess('Item added to Cart');
  }

  removeCartItem(product: any) {
    let idx = this.cartItems.indexOf(product);
    this.cartItems.splice(idx, 1);
    this.cartListSource.next(this.cartItems);
    this.notif.showSuccess('Item removed from Cart');
  }

  emptyCart() {
    this.cartItems = [];
    this.cartListSource.next(this.cartItems);
    this.notif.showSuccess('Cart is now empty');
  }
}
