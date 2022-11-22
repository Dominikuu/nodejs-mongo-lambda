"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
const mongoose_1 = require("mongoose");
const schema = {
    order_id: { type: mongoose_1.SchemaTypes.ObjectId, required: true, ref: 'orders' },
    product_id: { type: mongoose_1.SchemaTypes.ObjectId, required: true, ref: 'products' },
    quantity: { type: mongoose_1.SchemaTypes.Number, required: true },
};
const collectionName = 'orderItems';
const orderItemSchema = new mongoose_1.Schema(schema);
exports.OrderItem = mongoose_1.models.orderItems || (0, mongoose_1.model)(collectionName, orderItemSchema);
//# sourceMappingURL=orderItem.js.map