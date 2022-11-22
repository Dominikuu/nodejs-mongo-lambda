"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listOrders = exports.createOrder = exports.getOrder = void 0;
const order_controller_1 = require("./order.controller");
const order_service_1 = require("./order.service");
const service = new order_service_1.OrderService();
const controller = new order_controller_1.OrderController(service);
exports.getOrder = controller.getOrder;
exports.createOrder = controller.createOrder;
exports.listOrders = controller.listOrders;
//# sourceMappingURL=order.js.map