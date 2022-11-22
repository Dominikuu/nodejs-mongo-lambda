"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.createProduct = void 0;
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./product.service");
const service = new product_service_1.ProductService();
const controller = new product_controller_1.ProductController(service);
exports.createProduct = controller.createProduct;
exports.deleteProduct = controller.deleteProduct;
//# sourceMappingURL=product.js.map