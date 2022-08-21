import express, { Express, NextFunction, Request, Response } from 'express';
import { IUser } from '../user/user.interface';
import * as StoreService from '../store/store.service'
import * as DiscountCodeService from '../discountcode/discountcode.service';
import { IDiscountCode } from '../discountcode/discountcode.interface';

export const AdminRoutes = express.Router();

// login required middleware
const isAdminAuthenticated = (request: Request, response: Response, next: NextFunction) => {
    if (request.isAuthenticated()) {
        const user = request.user as IUser;
        if (user.isAdmin) {
            return next();
        }
        return response.redirect('/'); // user authed, but not an admin
    }
    response.redirect('/signin');
};

AdminRoutes.get("/", isAdminAuthenticated, (request: Request, response: Response, next: NextFunction) => {

    const user = request.user as IUser;

    response.render('admin', {
        'user': user,
        'discountCodes': DiscountCodeService.discountCodes,
        'totalCustomerVisits': StoreService.getTotalCustomerVisits(),
        'activeDiscountCode': StoreService.getActiveDiscountCode(),
        'totalDiscountCodeOfferings': StoreService.getTotalDiscountCodeOfferings(),
        'getNumberOfCustomersRemainingBeforeDiscountCodeOffered': StoreService.getNumberOfCustomersRemainingBeforeDiscountCodeOffered()
    });
});

AdminRoutes.post("/setOffer", isAdminAuthenticated, (request: Request, response: Response, next: NextFunction) => {

    const everyNth = request.body.everyNth as number;
    const offer = JSON.parse(request.body.offer) as IDiscountCode;

    StoreService.setActiveDiscountCode(offer, everyNth);

    response.redirect('/admin');
});

AdminRoutes.post("/clearOffer", isAdminAuthenticated, (request: Request, response: Response, next: NextFunction) => {

    StoreService.clearActiveDiscountCode();
    response.redirect('/admin');
});
