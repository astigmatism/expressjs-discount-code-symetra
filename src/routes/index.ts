import express, { Express, NextFunction, Request, Response } from 'express';

export const register = (app: express.Application) => {
    

    app.get("/", (request: Request, response: Response, next: NextFunction) => {        
        response.render('index');
    });
};