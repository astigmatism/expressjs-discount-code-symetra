import Config from 'config'
import { IDiscountCode } from "./discountcode.interface";


export const discountCodes = Config.get<IDiscountCode[]>('discountcodes');
