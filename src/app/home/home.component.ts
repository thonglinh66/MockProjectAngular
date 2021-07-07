import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export class Cart {
  id: number;
  name: string;
  price: number;
  img : string;
  quality : number;
}
const listCart: Cart[] = [
  {
    id: 1,
    name: "Iphone 11",
    price: 25000000,
    img: "applephone.jpg",
    quality: 20

  },
  {
    id: 2,
    name: "MeiZu",
    price: 1500000,
    img: "meizuphone.jpg",
    quality: 25

  },
  {
    id: 3,
    name: "Iphone 12",
    price: 55000000,
    img: "sp_iphoneX.png",
    quality: 30

  },
  {
    id: 4,
    name: "VSmart",
    price: 7000000,
    img: "vsphone.jpg",
    quality: 60

  },
  {
    id: 5,
    name: "Vivo",
    price: 2200000,
    img: "sp_vivo850.png",
    quality: 25

  }
]
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  show:boolean;
  shopCarts: Cart[] = [];
  listProduct: Cart[] = listCart;
 
  constructor( private router: Router) { }

  ngOnInit() {
    
    false
  }
  
  changeShow(){
    this.show = !this.show;
  }
  formatPrice(value) {
    let val = (value/1)
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }
  totalPrice (){
    let total = 0;
    for(let cart of this.shopCarts){
      total += cart.price*cart.quality;
    }
    return this.formatPrice(total);
  }
  addToCarts(id: number,name: string, price: number, img: string){
    let cart = new Cart();
    cart.id = id;
    cart.name =  name;
    cart.price = price; 
    cart.img = img;
    cart.quality = 1;
    this.shopCarts.push(cart);
  
  }
  changeQua(id:number,amount:number){
    var quality = this.shopCarts.find(item => item.id == id).quality;
    quality += amount;
    if(quality > 0){
      this.shopCarts.find(item => item.id == id).quality += amount;
    }
    else{
      this.shopCarts.forEach((value,index)=>{
        if(value.id== id) this.shopCarts.splice(index,1);
      });
    }
 
  }
  removeCart(id:number){
    this.shopCarts.forEach((value,index)=>{
      if(value.id== id) this.shopCarts.splice(index,1);
    });
  }
 
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }


  
}

