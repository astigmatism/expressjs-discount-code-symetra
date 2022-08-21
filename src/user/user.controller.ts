import express, { Express, NextFunction, Request, Response } from 'express';
import Passport from 'passport'
import { IUser } from '../user/user.interface';
import * as UsersService from '../user/user.service'
import * as StoreService from '../store/store.service'

export const UserController = express.Router();

const isAuthenticated = (request: Request, response: Response, next: NextFunction) => {
    if (request.isAuthenticated()) return next();
    response.redirect('/user/signin');
};

UserController.get("/signin", (request: Request, response: Response, next: NextFunction) => {
    const usernames = UsersService.getUserNames();
    response.render('signin', { 'usernames': usernames });
});

UserController.post('/login', Passport.authenticate('local'), (request: Request, response: Response, next: NextFunction) => {
    if (request.isAuthenticated()) {

        const user = request.user as IUser;

        // send admins to their portal
        if (user.isAdmin) return response.redirect('/admin');

        StoreService.newCustomerVisit(user, request.session.id);

        return response.redirect('/store');
    }
    response.redirect('/user/signin');
});

UserController.get('/logout', isAuthenticated, (request: Request, response: Response, next: NextFunction) => {

    StoreService.customerLeaves(request.session.id);

    request.logOut((e: Error) => {
        response.redirect('/user/signin');
    });
});
