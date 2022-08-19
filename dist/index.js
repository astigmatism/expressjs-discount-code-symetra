"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const register = (app) => {
    app.get("/", (request, response, next) => {
        response.render('index');
    });
};
exports.register = register;
//# sourceMappingURL=index.js.map