export class Product {
    id: number;
    name: string;
    price: number;
    img : string;
    quality : number;

    constructor(id: number, name: string, price: number, img: string, quality: number){
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
        this.quality = quality;
    }
    
    
    
}
