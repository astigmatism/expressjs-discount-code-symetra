import express, { Express, NextFunction, Request, Response } from 'express';
import * as StoreService from '../store/store.service'

export const StoreController = express.Router();

const isAuthenticated = (request: Request, response: Response, next: NextFunction) => {
    if (request.isAuthenticated()) return next();
    response.redirect('/user/signin');
};

StoreController.get("/", isAuthenticated, (request: Request, response: Response, next: NextFunction) => {

    const customer = StoreService.getCustomerInstance(request.session.id);
    response.render('index', {
        'username': customer?.user.username,
        'discountCode': customer?.appliedDiscountCode,
        'storeproducts': StoreService.getStoreProducts()
    });
});

StoreController.post("/purchase", isAuthenticated, (request: Request, response: Response, next: NextFunction) => {

    const customer = StoreService.getCustomerInstance(request.session.id);

    if (customer) {
        StoreService.purchaseProducts(customer);
    }
    response.json(true);
});