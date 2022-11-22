"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const errors_1 = require("../../shared/errors");
const database_1 = require("../../database");
const product_1 = require("../../database/model/product");
class ProductService {
    constructor() {
        (0, database_1.connectDB)();
    }
    createProduct(product) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const target = yield product_1.Product.findOne({ name: product.name }).exec();
                if (target) {
                    reject(new errors_1.BadRequestResult('CREATE_DENIED', "Product name duplicated"));
                    return;
                }
                const { id } = yield product_1.Product.create(new product_1.Product(product));
                const result = {
                    id
                };
                resolve(result);
            }
            catch (errors) {
                reject(new errors_1.ConfigurationErrorResult('CREATE_DENINED', 'You have no permission to access the city with the specified ID!'));
            }
        }));
    }
    deleteProduct(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const target = yield product_1.Product.findById(id).exec();
                if (!target) {
                    reject(new errors_1.BadRequestResult('DELETE_DENIED', "Target product isn't existed"));
                    return;
                }
                yield product_1.Product.deleteOne({ id }).exec();
                const result = {
                    message: 'DELETE PRODUCT ' + id
                };
                resolve(result);
            }
            catch (errors) {
                reject(new errors_1.ConfigurationErrorResult('DELETE_DENIED', errors));
            }
        }));
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map