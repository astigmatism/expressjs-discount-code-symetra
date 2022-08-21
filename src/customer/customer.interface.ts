import { IDiscountCode } from "../discountcode/discountcode.interface";
import { IUser } from "../user/user.interface";
import { ICart } from "../cart/cart.interface";

export interface ICustomer {
    user: IUser;
    sessionId: string,
    appliedDiscountCode: IDiscountCode | null
    cart: ICart
}