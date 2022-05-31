import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpClientSpy: any; //Mocks the HttpClient module

  beforeEach(() => {
    //We mock the get function of the HttpClient module
    httpClientSpy = {
      get: jest.fn(),
    };

    service = new ProductsService(httpClientSpy); //Create a fake instance of the ProductsService
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('should getProducts from API', () => {
    const response = 'data';
    let url = 'https://fakestoreapi.com/products';

    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(response));
    service.getProducts();
    expect(httpClientSpy.get).toBeCalledTimes(1); //Test if the GET method is triggered
    expect(httpClientSpy.get).toHaveBeenCalledWith(url); //Test if the GET request makes a call with our URL
  });
});
