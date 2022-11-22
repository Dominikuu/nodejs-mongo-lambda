"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.deleteUser = void 0;
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const service = new user_service_1.UserService();
const controller = new user_controller_1.UserController(service);
exports.deleteUser = controller.deleteUser;
exports.createUser = controller.createUser;
//# sourceMappingURL=user.js.map