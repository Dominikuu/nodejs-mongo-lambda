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
exports.OrderService = void 0;
const mongoose_1 = require("mongoose");
const errors_1 = require("../../shared/errors");
const database_1 = require("../../database");
const order_1 = require("../../database/model/order");
const orderItem_1 = require("../../database/model/orderItem");
const product_1 = require("../../database/model/product");
const user_1 = require("../../database/model/user");
class OrderService {
    constructor() {
        (0, database_1.connectDB)();
    }
    createOrder(order) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Check user if existed
                const user = yield user_1.User.findById(order.user_id).exec();
                if (!user) {
                    reject(new errors_1.BadRequestResult('CREATE_DENIED', "Target user isn't existed"));
                }
                // Check user if existed
                const orderItems = order.orderItem;
                const products = yield product_1.Product.find({
                    _id: {
                        $in: order.orderItem.map((item) => new mongoose_1.Types.ObjectId(item.product_id))
                    }
                }).exec();
                if (orderItems.length !== products.length) {
                    reject(new errors_1.BadRequestResult('CREATE_DENIED', "Target product isn't existed"));
                }
                const productMap = {};
                for (const product of products) {
                    productMap[product._id] = product.price;
                }
                ;
                const total = orderItems.reduce((acc, item) => productMap[item.product_id] * item.quantity + acc, 0);
                const { id: order_id } = yield order_1.Order.create(new order_1.Order(Object.assign(Object.assign({}, order), { total })));
                yield orderItem_1.OrderItem.insertMany(orderItems.map((orderItem) => (Object.assign(Object.assign({}, orderItem), { order_id }))));
                const result = {
                    id: order_id
                };
                resolve(result);
            }
            catch (errors) {
                reject(new errors_1.ConfigurationErrorResult('CREATE_DENINED', 'You have no permission to access the city with the specified ID!'));
            }
        }));
    }
    listOrders() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.fetchOrder();
                const result = {
                    orders
                };
                resolve(result);
            }
            catch (errors) {
                reject(new errors_1.ConfigurationErrorResult('LIST_DENINED', 'You have no permission to access the city with the specified ID!'));
            }
        }));
    }
    getOrder(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const target = yield order_1.Order.findById(id).exec();
                if (!target) {
                    reject(new errors_1.BadRequestResult('NOT_EXISTED', "Target order isn't existed"));
                    return;
                }
                const orders = yield this.fetchOrder(id);
                const result = {
                    order: orders[0]
                };
                resolve(result);
            }
            catch (errors) {
                reject(new errors_1.ConfigurationErrorResult('GET_DENINED', 'You have no permission to access the city with the specified ID!'));
            }
        }));
    }
    fetchOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pipeline = [
                {
                    $lookup: {
                        from: 'orderitems',
                        let: { order_id: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ['$$order_id', '$order_id'] },
                                },
                            },
                            {
                                $project: {
                                    quantity: 1, product_id: 1
                                }
                            }
                        ],
                        as: 'order_items'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                { $unwind: '$user' },
                { $addFields: { user: '$user' } },
            ];
            try {
                const orders = yield order_1.Order.aggregate(id ? [{ $match: { _id: new mongoose_1.Types.ObjectId(id) } }, ...pipeline] : pipeline).exec();
                // Qurey product info by orderItem.product_id
                const orderItemIds = new Set();
                const orderItems = orders.reduce((acc, cur) => acc.concat(cur.order_items), []);
                for (const orderItem of orderItems) {
                    orderItemIds.add(orderItem.product_id.toString());
                }
                const product_list = yield product_1.Product.find({ '_id': { $in: Array.from(orderItemIds) } }).exec();
                const productDict = product_list.reduce((acc, { _id, price, name, category }) => {
                    acc[_id] = { price, name, category };
                    return acc;
                }, {});
                // Restructure result object
                const result = orders.map(({ _id, order_items, total, user, payment, timestamp, delivery }) => {
                    const _order_items = order_items.map(({ product_id, quantity }) => {
                        const { name, description, price, category } = productDict[product_id];
                        return { quantity, name, description, price, product_id, category };
                    });
                    return { order_id: _id.toString(), total, payment, timestamp, delivery, order_items: _order_items, user: { user_id: user._id.toString(), email: user.email, first_name: user.first_name, last_name: user.last_name } };
                });
                return result;
            }
            catch (errors) {
                return [];
            }
        });
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map