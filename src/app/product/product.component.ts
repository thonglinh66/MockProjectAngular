import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import { Cart } from '../model/cart.model';
import { Product } from '../model/product.model';
import { CartService } from '../service/carts.service';
import { ProductService } from '../service/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productsObs: Observable<Product[]>;
  constructor(private productServ: ProductService, private cartServ: CartService, private home: HomeComponent) { 
    this.productsObs = this.productServ.products;
  }
  
  ngOnInit() {
    this.refresh();
  }
  
  refresh(){
    this.productServ.getAll().subscribe();
  }

  // data(): Observable<Product[]>{
  //   return this.service.productsObsevable()
  // }
  
  addToCarts(id: number, name: string, price: number, img: string){
    let productItem = new Product(id, name, price, img, 1);
    this.cartServ.addCart(productItem);
    this.home.refresh();

    // let cart = new Product();
    // cart.id = id;
    // cart.name =  name;
    // cart.price = price; 
    // cart.img = img;
    // cart.quality = 1;
    // this.shopCarts.push(cart);
  
  }
}