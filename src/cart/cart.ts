import { IStoreProduct } from "../product/product.interface";
import { ICart } from "./cart.interface";

export class Cart implements ICart {

    products: IStoreProduct[] = [];

    addProduct = (product: IStoreProduct) => {
        this.products.push(product);
    }

    empty = () => {
        this.products = []
    }

    totalCost = (priceAdjustment: number | null = null): number => {
        let prices = this.products.map(product => product.price);
        if (priceAdjustment) {
            prices = prices.map(price => price - (price * priceAdjustment));
        }
        return prices.reduce((current, previous) => current + previous, 0);
    }
}