import { IActiveDiscountCode, IDiscountCode } from '../discountcode/discountcode.interface';
import { Customer } from '../customer/customer';
import { IStoreProduct } from '../product/product.interface';

export interface IStore {
    name: string;
    products: IStoreProduct[];
    currentCustomers: Customer[];
    activeDiscountCode: IActiveDiscountCode | null;
}

export interface IStoreReport {
    customerVisits: number,
    activeCustomerCount: number,
    discountOfferings: number,
    numberOfCustomersBeforeNextOffer: number,
    activeDiscountCode: IDiscountCode | null,
    totalSales: number,
    totalTransactions: number,
    totalDiscountedSales: number,
    totalDiscountTransations: number
}