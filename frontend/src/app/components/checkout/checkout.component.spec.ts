import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let fixture: CheckoutComponent;
  let prodServMock: any;
  let cartServMock: any;

  beforeEach(() => {
    cartServMock = {
      cartList$: {
        subscribe() {},
      },
    };

    fixture = new CheckoutComponent(prodServMock, cartServMock);
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should run NgOnInit() without errors', () => {
    expect(
      fixture.total && fixture.cartItemsTemp && fixture.checkoutForm
    ).toBeFalsy();

    fixture.cartItemsTemp = [{ price: 1 }, { price: 1 }, { price: 1 }];

    fixture.ngOnInit();

    expect(fixture.checkoutForm).toBeTruthy();
    expect(fixture.total).toBeTruthy();
    expect(fixture.total).toEqual(parseInt((3 * 116.2).toFixed(0)));
  });
});
