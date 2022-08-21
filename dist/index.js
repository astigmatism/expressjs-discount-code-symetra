"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const index_1 = require("./routes/index");
const admin_controller_1 = require("./admin/admin.controller");
const user_controller_1 = require("./user/user.controller");
const store_controller_1 = require("./store/store.controller");
const cart_controller_1 = require("./cart/cart.controller");
const config_1 = __importDefault(require("config"));
const StoreService = __importStar(require("./store/store.service"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'pug');
// body parser middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.text({ limit: '50mb' }));
// session configuration
const session = (0, express_session_1.default)({
    secret: 'theres no business like snow business!',
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
    },
    saveUninitialized: true,
    resave: true,
    rolling: true // Force a session identifier cookie to be set on every response.
});
app.use(session);
// very basic authentication using Passport
const authUser = (username, password, done) => {
    password = password.toLowerCase();
    const users = config_1.default.get('users');
    const user = users.find((item) => { return item.username === username && item.phrase === password; });
    if (user) {
        return done(null, user);
    }
    return done('User not found', false);
};
app.use(passport_1.default.initialize()); // init passport on every route call.
app.use(passport_1.default.session()); // allow passport to use "express-session" defined above
passport_1.default.use(new passport_local_1.default.Strategy(authUser));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    const users = config_1.default.get('users');
    const user = users.find((item) => { return item.id === id; });
    done(null, user);
});
// routes/controllers
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/', index_1.IndexRoutes);
app.use('/admin', admin_controller_1.AdminController);
app.use('/user', user_controller_1.UserController);
app.use('/store', store_controller_1.StoreController);
app.use('/cart', cart_controller_1.CartController);
// build store on application start, instance held by service
StoreService.buildStore();
// start host listener
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
//# sourceMappingURL=index.js.map