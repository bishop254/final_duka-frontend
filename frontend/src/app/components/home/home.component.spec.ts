import { of } from 'rxjs';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: HomeComponent;
  let prodServMock: any;
  let cartServMock: any;
  let routerMock: any;

  beforeEach(() => {
    //Mock ProductService
    prodServMock = {
      getProducts: jest.fn(),
    };

    //Mock CartService
    cartServMock = {
      updateCartList: jest.fn(),
    };

    //Mock Router
    routerMock = {
      navigate: jest.fn(),
    };

    fixture = new HomeComponent(prodServMock, cartServMock, routerMock);
  });

  it('should be created', () => {
    expect(fixture).toBeTruthy();
    expect(fixture).toBeDefined();
  });

  it('should ensure products, allCategoryProduct and categoryNames to be empty at first', () => {
    expect(fixture.products).toBeFalsy();
    expect(fixture.allCategoryProducts).toBeFalsy();
    expect(fixture.categoryNames).toBeFalsy();
  });

  it('should update products Array with API data', () => {
    const response = [{}, {}, {}]; //Dummy API reponse data
    jest.spyOn(prodServMock, 'getProducts').mockReturnValue(of(response));
    fixture.ngOnInit();

    expect(prodServMock.getProducts).toBeCalledTimes(1);
    expect(fixture.products).toEqual(response);
    expect(fixture.allCategoryProducts).toEqual(fixture.products);
  });

  it('should get the different categories', () => {
    expect(fixture.categoryNames).toBeFalsy();

    fixture.products = [{}, {}, {}];
    fixture.getCategories();

    expect(fixture.categoryNames).toBeDefined();
  });

  it('should update category on user click event', () => {
    fixture.products = [];
    const mockEvent = {
      target: {
        classList: { remove: jest.fn(), add: jest.fn() },
        outerText: 'hello',
      },
    };

    fixture.allCategoryProducts = [];

    fixture.updateProductsCategory(mockEvent);

    expect(mockEvent.target.classList.add).toBeCalledTimes(1); //Ensure a class name is added to our clicked element
    expect(fixture.products).toBeTruthy(); //Ensure our products array contain a value.
  });

  it('should view a specific product', () => {
    const mockID = 3;
    fixture.viewProduct(mockID);
    expect(routerMock.navigate).toBeCalledTimes(1);
  });

  it('should add an item to the cart', () => {
    fixture.allCategoryProducts = [{ id: 2, name: 'bag2' },{ id: 3, name: 'bag3' }]
    
    const mockID = 3;
    const mockItem = [{ id: mockID, name: 'bag3' }];

    fixture.addToCart(mockID);

    expect(cartServMock.updateCartList).toBeCalledWith(mockItem)
    expect(cartServMock.updateCartList).toBeCalledTimes(1)
  });
});
