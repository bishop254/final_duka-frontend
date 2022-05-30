import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  //Function to fetch products from the API
  getProducts() {
    let url = 'https://fakestoreapi.com/products';

    return this.http.get(url).pipe(
      map((resp: any) => {
        console.log(typeof resp, 'type of API reponse');

        return resp;
      })
    );
  }
}
