import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    service = new CartService();
  });

  it('should be created (Cart Service)', () => {
    expect(service).toBeTruthy();
  });

  it('should call updateCartList and push the product to cartItems array', () => {
    let product = [{ name: 'prod1' }];

    service.updateCartList(product);

    expect(service.cartItems).toEqual(product);

    service.cartList$.subscribe((resp) => {
      let items = resp;
      expect(service.cartItems).toEqual(items);
    });
  });

  it('should remove an item from the cart', () => {
    let product = { name: 'two' };
    service.cartItems = [{ name: 'one' }, { name: 'two' }, { name: 'three' }];

    service.removeCartItem(product);

    expect(service.cartItems).toHaveLength(2);

    service.cartList$.subscribe((resp) => {
      let items = resp;
      expect(service.cartItems).toEqual(items);
    });
  });

  it('should empty the cart', () => {
    service.cartItems = [{ name: 'one' }, { name: 'two' }, { name: 'three' }];

    service.emptyCart();

    expect(service.cartItems).toHaveLength(0);
  });
});
