export interface IProduct {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}

export interface IStoreProduct extends IProduct {
    quantity: number;
}