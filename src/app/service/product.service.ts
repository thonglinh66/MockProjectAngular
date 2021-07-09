
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { environment } from '../environment/environmen';
import { Product } from '../model/product.model';



@Injectable()
export class ProductService {
    productsSubject: BehaviorSubject<Product[]>;
    private _productsObservable: Observable<Product[]>;
    constructor(private http: HttpClient) {
        this.productsSubject = new BehaviorSubject<Product[]>([]);
        console.log("huuhuhuh + " + this.productsSubject.getValue());
    }

    get products(): Observable<Product[]> {
        if (!this._productsObservable) {
            this._productsObservable = this.productsSubject.asObservable();
        }
        return this._productsObservable;
    }



    public getAll(): Observable<Product[]> {
        return this.http.get<Product[]>(`${environment.apiUrl}/products`).pipe(
            map((data: Product[]) => {
                // converting
                this.productsSubject.next(data);
                return data;
            }
            ),
            // catchError((err: HttpErrorResponse) => {
            //     console.log(err.message)
            //     // throw("error");
            //     // return of([])
            //     this.productsSubject.next([]);
            //     return Observable.empty<Product[]>();
            // })
        );
        // .catch((err: HttpErrorResponse) => {
        //     console.log(err);
        //     // throw("error");
        //     // return of([])
        //     return Observable.empty<Product[]>();
        // }
        // )

    }
}