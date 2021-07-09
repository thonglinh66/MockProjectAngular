import { Component, Input, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomeComponent } from '../home/home.component';
import { Cart } from '../model/cart.model';
import { Product } from '../model/product.model';
import { CartService } from '../service/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartsObser: Observable<Cart>;
  cart: Cart;
  total: number;
  constructor(private service: CartService, private home: HomeComponent) { 
    this.cartsObser = this.service.carts;
  }
  
  ngOnInit() {
    this.refresh();
  }
  
 
  refresh(){
    this.service.getAll().subscribe();
   
    if(!this.service.cart){
      this.service.createCart();
    }
    this.cart = this.service.cart;

  }

  changeShow(){
    this.home.changeShow();
  }
 

  removeCart(id: number){
    this.service.delCart(id);
  }

  changeQua( product: Product, val: number){
      this.service.changeQua( product, val);
  }

  

  

  
}
