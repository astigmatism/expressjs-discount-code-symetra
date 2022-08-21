import { IProduct, IStoreProduct } from "./product.interface";

export class StoreProduct implements IStoreProduct {

    id: number;
    quantity: number;
    name: string;
    price: number;
    description: string;
    image: string;

    constructor(product: IProduct, quantity: number) {
        this.id = product.id;
        this.quantity = quantity;
        this.name = product.name;
        this.description = product.description;
        this.image = product.image;
        this.price = product.price;
    }
}