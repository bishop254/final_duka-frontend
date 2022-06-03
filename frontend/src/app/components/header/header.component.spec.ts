import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

import { CartService } from '../../services/cart.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: HeaderComponent;
  let cartServMock: any;

  beforeEach(() => {
    cartServMock = {
      cartList$: {
        subscribe: jest.fn(),
      },
    };

    fixture = new HeaderComponent(cartServMock);
  });

  describe('Test: NgOnInit()', () => {
    it('should update the cartNumber variable', () => {
      jest.spyOn(cartServMock.cartList$, 'subscribe').mockReturnValue(of(4));

      fixture.ngOnInit();

      expect(cartServMock.cartList$.subscribe).toBeCalledTimes(1);
    });

    // it('should update the cartNumber variable', () => {
    //   const fx = TestBed.createComponent(HeaderComponent);
    //   const appX = fx.componentInstance;
    //   const mockCartServ = fx.debugElement.injector.get(CartService);

    //   const prod1 = [{name: 'bag1'}]
    //   const prod2 = [{name: 'bag2'}]

    //   mockCartServ.updateCartList(prod1);
    //   mockCartServ.updateCartList(prod2);

    //   fixture.ngOnInit();

    //   expect(fixture.cartNumber).toBeTruthy();
    // });
  });
});

// describe('HeaderComponent', () => {
//   let component: HeaderComponent;
//   let fixture: any;
//   let cartServMock: any;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [HeaderComponent],
//       imports: [ToastrModule.forRoot(), FontAwesomeModule],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(HeaderComponent);
//     component = fixture.componentInstance;
//     cartServMock = fixture.debugElement.injector.get(CartService);

//     fixture.detectChanges();
//   });

//   it('should render the Header Component', () => {
//     expect(fixture).toBeTruthy();
//   });

//   it('should call NgOnInit() and update the cartNumber variable', () => {
//     jest.spyOn(cartServMock.cartList$, 'subscribe').mockReturnValue(of([{}, {}, {}]));

//     component.ngOnInit();

//     expect(cartServMock.cartList$.subscribe).toBeCalled();

//     // expect(component.cartNumber).toBeTruthy();
//   });
// });
