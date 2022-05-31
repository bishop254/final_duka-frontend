import { of } from 'rxjs';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: HomeComponent;
  let prodServMock: any;
  let cartServMock: any;

  beforeEach(() => {
    prodServMock = {
      getProducts: jest.fn(),
    };

    cartServMock = {
      updateCart: jest.fn(),
    };
    fixture = new HomeComponent(prodServMock, cartServMock);
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
});
