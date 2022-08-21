export interface IDiscountCode {
    id: number,
    code: string;
    description: string;
    priceAdjustment: number;
}

export interface IActiveDiscountCode {
    discountCode: IDiscountCode;
    offeredToEveryNthCustomer: number;
}