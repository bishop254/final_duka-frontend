import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartService } from '../../services/cart.service';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let fixture: CartComponent;
  let cartServMock: any;

  beforeEach(() => {
    cartServMock = {
      removeCartItem: jest.fn(),
      emptyCart: jest.fn(),
    };

    fixture = new CartComponent(cartServMock);
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should call getCart on initialization', () => {
    expect(fixture.cartArray).toEqual([]);
    expect(fixture.total).toBeFalsy();

    const fx = TestBed.createComponent(CartComponent);
    fixture = fx.componentInstance;
    const cartService = fx.debugElement.injector.get(CartService); //Lets us inject our CartService

    let product1 = [{ name: 'one', price: 1 }];
    let product2 = [{ name: 'two', price: 1 }];

    cartService.updateCartList(product1);
    cartService.updateCartList(product2);

    fixture.ngOnInit();

    expect(fixture.cartArray).toBeTruthy();
    expect(fixture.cartArray).not.toEqual([]);

    expect(fixture.total).toBeTruthy();
    expect(fixture.total).toBe(2);
  });

  it('should check if an item can be removed from the cart', () => {
    fixture.cartArray = [
      { id: '1', name: 'bag1', price: 1 },
      { id: '2', name: 'bag2', price: 1 },
      { id: '3', name: 'bag3', price: 1 },
    ];

    fixture.removeItem(fixture.cartArray[0]);

    expect(cartServMock.removeCartItem).toBeCalledTimes(1);
    expect(fixture.total).toBeTruthy();
  });

  it('should empty cart', () => {
    fixture.cartArray.length = 3;

    fixture.emptyCart();

    expect(fixture.cartArray).toEqual([]);
    expect(fixture.cartArray).toHaveLength(0);
    expect(cartServMock.emptyCart).toBeCalledTimes(1);
  });
});
