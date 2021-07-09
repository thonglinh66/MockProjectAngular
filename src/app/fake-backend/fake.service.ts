import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable} from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { Product } from '../model/product.model';

const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: "Admin" },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: "User" }
];



const carts = [
    {
        id: 1,
        userId: 2,
        products: [
            {
                id: 1,
                name: "Iphone 11",
                price: 25000000,
                img: "applephone.jpg",
                quality: 2
            
              },
              {
                id: 2,
                name: "MeiZu",
                price: 1500000,
                img: "meizuphone.jpg",
                quality: 1
            
              },
        ],
                
        total: 51500000,
        
    }
];

const products =[
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
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const {url, method, headers, body } = request;
        
        return handleRouter();
        
        function handleRouter() {
            switch(true){
                case url.endsWith('/users/authenticate') && method == 'POST':
                    return authenticate();
                case url.endsWith('/products') && method == 'GET':
                    return getProducts();
                case url.endsWith('/carts') && method == 'POST':
                    return getCart();
                default:
                    return next.handle(request);
            }
        }

        function getCart() {
            const {userId} = body;
            const cart = carts.find(item => item.userId == userId);
            console.log(cart);
            return ok(cart);
        }

        function authenticate() {
            const {username, password} = body;
            const user = users.find(item => item.username == username && item.password == password)
            if(!user) return error('Username or password dont correct');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                token: `fake-jwt-token.${user.id}`

            });
        }

        function ok(body) {
            return of(new HttpResponse({status: 400, body}))
                .pipe(delay(500));
        }

        function error(message) {
            return _throw({ status: 400, error: { message } })
                .pipe(materialize(), delay(500), dematerialize());
        }

        function currentUser() {
            if (!isLoggedIn()) return;
            const id = parseInt(headers.get('Authorization').split('.')[1]);
            return users.find(x => x.id === id);
        }

        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token');
        }

        function unauthorized() {
            return _throw({ status: 401, error: { message: 'unauthorized' } })
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function isUser() {
            return isLoggedIn() && currentUser().role === "User";
        }

        function getProducts() {
            
            return ok(products);
        }
       
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};