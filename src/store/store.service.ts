import { IStore, Store } from './store';
import { IStoreProduct, IProduct } from '../product/product.interface'
import { StoreProduct } from '../product/product';
import Config from 'config'
import { IActiveDiscountCode, IDiscountCode } from '../discountcode/discountcode.interface';
import { IUser } from '../user/user.interface';
import { ICustomer } from '../customer/customer.interface';
import { Customer } from '../customer/customer'
import { response } from 'express';
import { IStoreReport } from './store.interface';

// protected members

let storeInstance: Store;

// private methods

const buildStoreProductInventory = () => {
    const products = Config.get<IProduct[]>('products');
    products.forEach((product: IProduct) => {
        storeInstance.addProduct(product as IProduct);
    });
}

// exports (public)

export const buildStore = (): Store => {

    storeInstance = new Store(Config.get('store.name'));
    buildStoreProductInventory();
    return storeInstance;
}

export const getTotalCustomerVisits = (): number => {
    return storeInstance.totalCustomerVisits;
}

export const newCustomerVisit = (user: IUser, sessionId: string) => {

    storeInstance.addCustomer(new Customer(user, sessionId, storeInstance.doesCustomerQualifyForActiveDiscountCode()));
}

export const customerLeaves = (sessionId: string) => {
    storeInstance.removeCustomer(sessionId);
}

export const getActiveDiscountCode = (): IActiveDiscountCode | null => {
    return storeInstance.activeDiscountCode;
}

export const setActiveDiscountCode = (discountCode: IDiscountCode | null, offeredToEveryNthCustomer: number) => {
    return storeInstance.setActiveDiscountCode(discountCode, offeredToEveryNthCustomer);
}

export const clearActiveDiscountCode = () => {
    return storeInstance.setActiveDiscountCode(null);
}

export const getNumberOfCustomersRemainingBeforeDiscountCodeOffered = (): number => {
    return storeInstance.numberOfCustomersRemainingBeforeDiscountCodeOffer;
}

export const getStoreProducts = (): StoreProduct[] => {
    return storeInstance.products;
}

export const findStoreProductById = (id: number): IStoreProduct | undefined => {
    return storeInstance.products.find((p: IStoreProduct) => p.id === id);
}

export const getCustomerInstance = (sessionId: string): Customer | null => {

    const customer = storeInstance.currentCustomers.find((c: Customer) => { return c.sessionId === sessionId });
    if (customer) return customer;
    return null;
}

export const getTotalDiscountCodeOfferings = (): number => {
    return storeInstance.totalDiscountCodeOfferings;
}

export const purchaseProducts = (customer: Customer) => {

    const discountCode = customer.appliedDiscountCode;
    const transactionValue = customer.cart.totalCost(discountCode?.priceAdjustment);

    storeInstance.totalTransactions++;
    storeInstance.totalSales += transactionValue

    if (discountCode) {
        storeInstance.totalDiscountTransations++;
        storeInstance.totalDiscountSales += transactionValue;
    }

    customer.cart.empty();
    customer.setDiscountCode(null); // remove discount code
}

export const generateStoreReport = (): IStoreReport => {

    const report: IStoreReport = {
        customerVisits: storeInstance.totalCustomerVisits,
        activeCustomerCount: storeInstance.currentCustomers.length,
        discountOfferings: storeInstance.totalDiscountCodeOfferings,
        numberOfCustomersBeforeNextOffer: storeInstance.numberOfCustomersRemainingBeforeDiscountCodeOffer,
        activeDiscountCode: (storeInstance.activeDiscountCode ? storeInstance.activeDiscountCode.discountCode : null),
        totalSales: storeInstance.totalSales,
        totalTransactions: storeInstance.totalTransactions,
        totalDiscountedSales: storeInstance.totalDiscountSales,
        totalDiscountTransations: storeInstance.totalDiscountTransations
    };
    return report;
}


