import { Cart } from "../cart/cart";
import { ICart } from "../cart/cart.interface";
import { IDiscountCode } from "../discountcode/discountcode.interface";
import { IStoreProduct } from "../product/product.interface";
import { IUser } from "../user/user.interface";
import { ICustomer } from "./customer.interface";

export class Customer implements ICustomer {
    user: IUser;
    sessionId: string;
    appliedDiscountCode: IDiscountCode | null;
    cart: Cart;

    constructor(user: IUser, sessionId: string, discountCode: IDiscountCode | null = null) {
        this.user = user;
        this.sessionId = sessionId;
        this.appliedDiscountCode = discountCode;
        this.cart = new Cart();
    }

    getCart = (): Cart => {
        return this.cart;
    }

    setDiscountCode = (code: IDiscountCode | null) => {
        this.appliedDiscountCode = code;
    }
}