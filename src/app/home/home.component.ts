import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CartComponent } from '../cart/cart.component';
import { Cart } from '../model/cart.model';
import { Product } from '../model/product.model';
import { CartService } from '../service/carts.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  show: boolean;
  lenght: number;
  constructor( private router: Router, private authenticate: AuthService, private cartSer: CartService) { 
    this.show = false;
  }

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    if(this.cartSer.cart){
      this.lenght = this.cartSer.cart.products.length;
    }else{
      this.lenght = this.lenght = 0;
    }
  }

  changeShow(){
    this.show = !this.show;
  }

  
 
  totalPrice (){
    // let total = 0;
    // for(let cart of this.shopCarts){
    //   total += cart.price*cart.quality;
    // }
    // return this.formatPrice(total);
  }
  
  

  
    // var quality = this.shopCarts.find(item => item.id == id).quality;
    // var maxQuality = this.listProduct.find(item => item.id == id).quality;
    // quality += amount;
    // if(quality > 0 && quality < maxQuality){
    //   this.shopCarts.find(item => item.id == id).quality += amount;
    // }
    // else if(quality == 0){
    //   this.shopCarts.forEach((value,index)=>{
    //     if(value.id== id) this.shopCarts.splice(index,1);
    //   });
    // }
    // else{
    //   alert("Quality was maximum");
    // }
 
  
  
 

  removeCart(id:number){
    // this.shopCarts.forEach((value,index)=>{
    //   if(value.id== id) this.shopCarts.splice(index,1);
    // });
  }
 
  logOut(){
    this.authenticate.logout();
  }


  
}

