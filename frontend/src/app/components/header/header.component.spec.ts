import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartService } from '../../services/cart.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: HeaderComponent;
  let cartServMock: any;

  beforeEach(() => {
    fixture = new HeaderComponent(cartServMock);
  });

  it('should create the Header component', () => {
    expect(fixture).toBeTruthy();
    expect(fixture).toBeDefined();
  });

  it('should get the number of items in the cart', () => {
    const fx = TestBed.createComponent(HeaderComponent);
    const app = fx.componentInstance;
    const cartService = fx.debugElement.injector.get(CartService); //Lets us inject our CartService

    let product1 = [{ name: 'one' }];
    let product2 = [{ name: 'two' }];

    cartService.updateCartList(product1);
    cartService.updateCartList(product2);

    app.ngOnInit();

    expect(app.cartNumber).toBeTruthy();
    expect(app.cartNumber).toBe(2);
  });
});
