import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faHeartbeat, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  id!: number;
  product: any;

  //icons
  faBasket = faShoppingCart;
  faHeart = faHeartbeat

  constructor(
    private route: ActivatedRoute,
    private prodServ: ProductsService,
    private cartServ: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param['id'];
    });

    this.prodServ.getProducts().subscribe((resp) => {
      let allProducts = resp;

      this.product = allProducts.filter(
        (specificProduct: any) => specificProduct.id == this.id
      );
    });
  }

  addToCart() {
    this.cartServ.updateCartList(this.product);
  }
}
