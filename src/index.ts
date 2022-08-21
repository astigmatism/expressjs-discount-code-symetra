import express, { Express } from 'express';
import Dotenv from 'dotenv';
import Path from 'path';
import BodyParser from 'body-parser';
import ExpressSession from 'express-session'
import Passport from 'passport'
import PassportLocal from "passport-local";
import { IndexRoutes } from "./routes/index"
import { AdminController } from "./admin/admin.controller"
import { UserController } from "./user/user.controller"
import { StoreController } from "./store/store.controller"
import { CartController } from "./cart/cart.controller"
import Config from 'config'
import { IUser } from './user/user.interface'
import * as StoreService from './store/store.service'

Dotenv.config();

const app: Express = express();
const port = process.env.PORT;


// view engine setup
app.set('views', Path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// body parser middleware
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.text({ limit: '50mb' }));

// session configuration
const session = ExpressSession({
  secret: 'theres no business like snow business!',
  cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
  },
  saveUninitialized: true, // this saves uninitiallized sessions making it so that simply visiting the site resets expiration
  resave: true, // Forces the session to be saved back to the session store, even if the session was never modified during the request.
  rolling: true // Force a session identifier cookie to be set on every response.
});
app.use(session);

// very basic authentication using Passport
const authUser = (username: string, password: string, done: any) => {
  password = password.toLowerCase();
  const users = Config.get<IUser[]>('users');
  const user = users.find((item) => { return item.username === username && item.phrase === password });

  if (user) {
    return done (null, user);
  }
  return done ('User not found', false);
}
app.use(Passport.initialize()); // init passport on every route call.
app.use(Passport.session()); // allow passport to use "express-session" defined above
Passport.use(new PassportLocal.Strategy(authUser));

Passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

Passport.deserializeUser((id: number, done) => {

    const users = Config.get<IUser[]>('users');
    const user = users.find((item) => { return item.id === id });
    done (null, user);
});

// routes/controllers
app.use(express.static(Path.join(__dirname, 'public')));
app.use('/', IndexRoutes);
app.use('/admin', AdminController);
app.use('/user', UserController);
app.use('/store', StoreController);
app.use('/cart', CartController);

// build store on application start, instance held by service
StoreService.buildStore();

// start host listener
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});