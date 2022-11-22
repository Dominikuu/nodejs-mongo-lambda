"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.Delivery = exports.Payment = void 0;
const mongoose_1 = require("mongoose");
var Payment;
(function (Payment) {
    Payment["credit"] = "credit";
    Payment["cash"] = "cash";
})(Payment = exports.Payment || (exports.Payment = {}));
var Delivery;
(function (Delivery) {
    Delivery["freight"] = "freight";
    Delivery["air"] = "air";
    Delivery["boat"] = "boat";
    Delivery["motorbike"] = "motorbike";
})(Delivery = exports.Delivery || (exports.Delivery = {}));
const schema = {
    user_id: { type: mongoose_1.SchemaTypes.ObjectId, required: true },
    timestamp: { type: mongoose_1.SchemaTypes.Date, default: Date.now },
    total: { type: mongoose_1.SchemaTypes.Number, required: true },
    payment: { type: mongoose_1.SchemaTypes.String, enum: Object.values(Payment), required: true },
    delivery: { type: mongoose_1.SchemaTypes.String, enum: Object.values(Delivery), required: true },
};
const collectionName = 'orders';
const orderSchema = new mongoose_1.Schema(schema);
exports.Order = mongoose_1.models.orders || (0, mongoose_1.model)(collectionName, orderSchema);
//# sourceMappingURL=order.js.map