import { IProduct, IStoreProduct } from '../product/product.interface';
import { StoreProduct } from '../product/product'
import { IDiscountCode, IActiveDiscountCode } from '../discountcode/discountcode.interface';
import { ICustomer } from '../customer/customer.interface'
import { Customer } from '../customer/customer';

export interface IStore {
    name: string;
    products: IStoreProduct[];
    currentCustomers: Customer[];
    activeDiscountCode: IActiveDiscountCode | null;
}

export class Store implements IStore {

    name: string;
    products: IStoreProduct[];
    currentCustomers: Customer[];
    activeDiscountCode: IActiveDiscountCode | null;

    totalCustomerVisits = 0;
    totalTransactions = 0;
    totalDiscountTransations = 0;
    totalSales = 0;
    totalDiscountSales = 0;
    totalDiscountCodeOfferings = 0;
    numberOfCustomersRemainingBeforeDiscountCodeOffer = -1;

    constructor(name: string) {
        this.name = name;
        this.products = [];
        this.currentCustomers = [];
        this.activeDiscountCode = null;
    }

    addProduct = (product: IProduct, quantity = 100) => {
        this.products.push(new StoreProduct(product, quantity));
    }

    addCustomer = (customer: Customer) => {
        this.totalCustomerVisits++;
        this.currentCustomers.push(customer);
    }

    removeCustomer = (sessionId: string) => {
        this.currentCustomers = this.currentCustomers.filter((customer: ICustomer) => customer.sessionId !== sessionId);
    }

    doesCustomerQualifyForActiveDiscountCode = (): IDiscountCode | null => {

        // if an active discount code offer (not null)
        if (this.activeDiscountCode) {
            this.numberOfCustomersRemainingBeforeDiscountCodeOffer--; // reduce the number of customers until offer is given

            if (this.numberOfCustomersRemainingBeforeDiscountCodeOffer === 0) {
                this.numberOfCustomersRemainingBeforeDiscountCodeOffer = this.activeDiscountCode.offeredToEveryNthCustomer;
                this.totalDiscountCodeOfferings++;
                return this.activeDiscountCode.discountCode;
            }
        }

        return null;
    }

    setActiveDiscountCode = (discountCode: IDiscountCode | null, offeredToEveryNthCustomer: number = -1) => {

        if (discountCode) {
            this.activeDiscountCode = {
                'discountCode': discountCode,
                'offeredToEveryNthCustomer': offeredToEveryNthCustomer
            } as IActiveDiscountCode;
            this.numberOfCustomersRemainingBeforeDiscountCodeOffer = offeredToEveryNthCustomer;
            return;
        }
        this.activeDiscountCode = null;
    }
}