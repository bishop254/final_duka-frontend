import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  cartItemsTemp!: Array<any>;
  paid: boolean = false;
  total!: number;

  constructor(
    private prodServ: ProductsService,
    private cartServ: CartService
  ) {}

  ngOnInit(): void {
    this.checkoutForm = this.createFormGroup();

    this.cartServ.cartList$.subscribe((resp) => {
      this.cartItemsTemp = resp;
    });

    this.total = 0;
    this.cartItemsTemp.forEach((product: any) => {
      this.total += product.price;
    });
    this.total = parseInt((this.total * 116.2).toFixed(0));
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      mobile: new FormControl('', [
        Validators.required,
        Validators.minLength(13),
      ]),
    });
  }

  checkout() {
    console.log('mbesha');
  }
}
