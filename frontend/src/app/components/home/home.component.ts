import { Component, OnInit } from '@angular/core';

import { faEye, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products!: Array<any>; //Holds sorted products
  allCategoryProducts!: Array<any>; //Holds all our products
  categoryNames!: Set<string>; //Holds our different category names.

  //icons
  faEye = faEye;
  faBasket = faShoppingCart;

  constructor(
    private prodServ: ProductsService,
    private cartServ: CartService
  ) {}

  ngOnInit(): void {
    this.prodServ.getProducts().subscribe((resp) => {
      this.products = resp;
      this.allCategoryProducts = resp;

      this.getCategories();
    });
  }

  getCategories() {
    let categories: Array<string> = [];
    this.products.forEach((product: any) => {
      categories.push(product.category);
    });
    this.categoryNames = new Set(categories);
  }

  updateProductsCategory(event: any) {
    let selectedElement = document.querySelector('.selected');
    selectedElement?.classList.remove('selected');

    event.target.classList.add('selected');

    let selectedCategoryName: string = event.target.outerText;

    //Toggle between all categories and a specific one.
    if (selectedElement === event.target) {
      event.target.classList.remove('selected');
      this.products = this.allCategoryProducts;
    } else {
      let categoryProducts = this.allCategoryProducts.filter(
        (product: any) =>
          selectedCategoryName[0] == product.category[0] &&
          selectedCategoryName.includes(product.category)
      );
      this.products = categoryProducts;
    }
  }

  viewProduct(id: number) {
    console.log('viewed');
  }

  addToCart(id: number) {
    let itemToAdd = this.allCategoryProducts.filter(
      (product: any) => product.id === id
    );
    this.cartServ.updateCartList(itemToAdd);
  }
}
