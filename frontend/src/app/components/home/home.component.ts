import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  faEye,
  faSearch,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';

import { NotificationsService } from '../../services/notifications.service';
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
  searchForm!: FormGroup;

  //icons
  faEye = faEye;
  faBasket = faShoppingCart;
  search = faSearch;

  constructor(
    private prodServ: ProductsService,
    private cartServ: CartService,
    private notif: NotificationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.prodServ.getProducts().subscribe((resp) => {
      this.products = resp;
      this.allCategoryProducts = resp;

      this.getCategories();
    });
    this.searchForm = this.createFormGroup();
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
    this.router.navigate([`/product/${id}`]);
  }

  addToCart(id: number) {
    let itemToAdd = this.allCategoryProducts.filter(
      (product: any) => product.id === id
    );
    this.cartServ.updateCartList(itemToAdd);
  }

  createFormGroup() {
    return new FormGroup({
      search: new FormControl('', [Validators.required, Validators.min(1)]),
    });
  }

  doSearch() {
    let searchTerm = this.searchForm.value.search;
    let items = this.allCategoryProducts.filter((product: any) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (items.length > 0) {
      this.products = items;
    } else if (items.length === 0) {
      this.notif.showError('Cannot find matching product');
      this.searchForm = this.createFormGroup();
      this.products = this.allCategoryProducts;
    }
  }
}
