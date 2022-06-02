import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of, subscribeOn } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let fixture: any;
  let routeMock: any;
  let prodServMock: any;
  let cartServMock: any;

  beforeEach(() => {
    routeMock = {
      params: {
        param: [{ id: 3 }],
        subscribe: () => {
          fixture.id = routeMock.params.param[0].id;
        },
      },
    };

    prodServMock = {
      getProducts: jest.fn(),
    };

    cartServMock = {
      updateCartList: jest.fn(),
    };

    fixture = new ProductComponent(routeMock, prodServMock, cartServMock);
  });

  it('should create Product component', () => {
    expect(fixture).toBeTruthy();
  });

  it('should call NgOnInit() successfully', () => {
    expect(fixture.id).toBeFalsy();
    expect(fixture.product).toBeFalsy();

    const productMockData = [
      { id: 1, name: 'bag1' },
      { id: 2, name: 'bag2' },
      { id: 3, name: 'bag3' },
    ];

    jest
      .spyOn(prodServMock, 'getProducts')
      .mockReturnValue(of(productMockData));

    fixture.ngOnInit();

    expect(fixture.product && fixture.id).toBeTruthy();
    expect(fixture.id).toEqual(routeMock.params.param[0].id);
    expect(prodServMock.getProducts).toBeCalledTimes(1);
    expect(fixture.product).toEqual([{ id: 3, name: 'bag3' }]);
  });

  it('should add an item to the cart', () => {
    fixture.addToCart();
    expect(cartServMock.updateCartList).toBeCalledTimes(1);
  });
});
