import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faEye, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { ProductsService } from 'src/app/services/products.service';

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

  constructor(private prodServ: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.prodServ.getProducts().subscribe((resp) => {
      this.products = resp;
      this.allCategoryProducts = resp;

      this.getCategories();
    });
  }

  getCategories() {
    let categories!: Array<string>;
    this.products.forEach((product: any) => {
      categories.push(product.category);
    });
    this.categoryNames = new Set(categories);
  }

  updateProductsCategory(event: any) {
    let selectedElement = document.querySelector('.selected');
    selectedElement?.classList.remove('selected');

    event.target.classList.add('selected');

    let selectedCategory: string = event.target.outerText;

    //Toggle between all categories and a specific one.
    if (selectedElement === event.target) {
      event.target.classList.remove('selected');
      this.products = this.allCategoryProducts;
    } else {
      let categoryProducts = this.allCategoryProducts.filter((product: any) => {
        selectedCategory[0] === product.category[0] &&
          selectedCategory.includes(product.category);
      });

      this.products = categoryProducts;
    }
  }

  viewProduct(id: number) {
    console.log('viewed');
  }

  addToCart(id: number) {
    console.log('added');
  }
}
