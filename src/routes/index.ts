import express, { Express, NextFunction, Request, Response } from 'express';

export const IndexRoutes = express.Router();

const isAuthenticated = (request: Request, response: Response, next: NextFunction) => {
    if (request.isAuthenticated()) return next();
    response.redirect('/user/signin');
};

IndexRoutes.get("/", isAuthenticated, (request: Request, response: Response, next: NextFunction) => {
    response.redirect('/store');
});
