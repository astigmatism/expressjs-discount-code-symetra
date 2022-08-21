import express, { Express, NextFunction, Request, Response } from 'express';
import * as StoreService from '../store/store.service'

export const CartController = express.Router();

const isAuthenticated = (request: Request, response: Response, next: NextFunction) => {
    if (request.isAuthenticated()) return next();
    response.redirect('/user/signin');
};

CartController.get("/", isAuthenticated, (request: Request, response: Response, next: NextFunction) => {

    const customer = StoreService.getCustomerInstance(request.session.id);

    if (customer) {
        const cart = customer.getCart();
        const discountCode = customer.appliedDiscountCode;
        const priceAdjustment = discountCode ? discountCode.priceAdjustment : null;

        return response.render('cart', {
            'username': customer.user.username,
            'discountCode': discountCode,
            'products': cart.products,
            'total': cart.totalCost(priceAdjustment)
        });
    }
    response.redirect('/user/signin');
});

CartController.post('/add', isAuthenticated, (request: Request, response: Response, next: NextFunction) => {

    const product = StoreService.findStoreProductById(request.body.productId);
    const customer = StoreService.getCustomerInstance(request.session.id);

    if (product && customer) {
        customer.cart.addProduct(product);
    }

    response.json();
});

CartController.post('/empty', isAuthenticated, (request: Request, response: Response, next: NextFunction) => {

    const customer = StoreService.getCustomerInstance(request.session.id);

    if (customer) {
        customer.cart.empty();
    }

    response.json();
});