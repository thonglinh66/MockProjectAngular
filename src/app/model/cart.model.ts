import { Product } from "./product.model";

export class Cart {
    id: number;
    userId: number;
    products: Product[];
    total: number;
    
    constructor(id: number, userId: number, products: Product[], total: number){
        this.id = id;
        this.userId = userId;
        this.products = products;
        this.total = total;
    }
}