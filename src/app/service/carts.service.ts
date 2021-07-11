import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { find, map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { environment } from "../environment/environmen";
import { Cart } from "../model/cart.model";
import { Product } from "../model/product.model";
import { ProductService } from "./product.service";

@Injectable()
export class CartService{
    cartSubject: Subject<Cart>;
    private _cartObservable: Observable<Cart>;
    cart: Cart;
    constructor(private http: HttpClient, private auth: AuthService, private pruductSer: ProductService){
        this.cartSubject =  new Subject<Cart>();
        
    }

    get carts(): Observable<Cart>{
        if(!this._cartObservable) 
            this._cartObservable = this.cartSubject.asObservable();
        return this._cartObservable;
    }

   

    public getAll(): Observable<Cart> {
        let userId = this.auth.userValue.id;
        return this.http.post<Cart>(`${environment.apiUrl}/carts`, {userId})
            .pipe(map((data: Cart) => {
                this.cartSubject.next(data);
                this.cart = data;
                return data;
            }));
        
    }

    public delCart(id: number) {
        this.cart.products.splice(this.cart.products.findIndex((item) => item.id == id),1);
        let total = this.total();
        this.cart.total = total;
        this.http.post(`${environment.apiUrl}/delcart`,{id})
            .pipe(map((res) => {
                return res;
            }));
    }

    public changeQua(product: Product, val: number){
        let quality = this.cart.products.find((item) => item.id == product.id).quality;
        quality += val;
        let check: number;
        this.pruductSer.products.subscribe(item => check = item.find((item) => item.id == product.id).quality);
        if(quality > 0 && quality <= check){
            let userId = this.auth.userValue.id;
            this.cart.products.find((item) => item.id == product.id).quality = quality;
            this.cart.total = this.total();
            let total = this.cart.total;
            let productChange = this.cart.products;
            let cartId = this.cart.id;
            this.http.post(`${environment.apiUrl}/change`,{userId, cartId, productChange, total})
            .pipe(map((res) => {
                return res;
            }));
        }
        
    }

    public addCart(product: Product){
        
        let userId = this.auth.userValue.id;
        
        if(!this.cart){
            this.createCart();
        }
        let id = this.cart.id;
        if(this.cart.products.find(item => item.id == product.id)){
            let quality = this.cart.products.find((item) => item.id == product.id).quality;
            let check: number;
            this.pruductSer.products.subscribe(item => check = item.find((item) => item.id == product.id).quality);
            if(quality < check){    
                this.cart.products.find(item => item.id == product.id).quality ++;
                let total = this.total();
                this.cart.total = total;
                let productItem =  this.cart.products;
                this.http.post(`${environment.apiUrl}/updateCart`,{ userId, id,  productItem, total})
                .pipe(map((res) => {
                    return res;
                }));
            }
        }else{
            this.cart.products.push(product);
            let productItem =  this.cart.products;
            let total = this.total();
            this.cart.total = total;
            
            this.http.post(`${environment.apiUrl}/addcart`,{ userId, id,  productItem, total})
                .pipe(map((res) => {
                    return res;
                }));
        }
        this.cartSubject.next(this.cart);
        console.log(this.cart);
       
    }

    public total(){
        let total = 0;
        this.cart.products.forEach(item => total += ( item.price * item.quality)); 
        return total;
    }


    public createCart(){
        let userId = this.auth.userValue.id;
        this.cart = new Cart(2,userId, [], 0 );
    }

}