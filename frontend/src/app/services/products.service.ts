import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  //Function to fetch products from the API
  getProducts(): Observable<any> {
    let url = 'https://fakestoreapi.com/products';

    return this.http.get(url).pipe(
      map((resp: object) => {
        return resp;
      })
    );
  }
}
