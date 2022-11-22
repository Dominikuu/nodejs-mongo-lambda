"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const schema = {
    category: { type: mongoose_1.SchemaTypes.String, required: true },
    name: { type: mongoose_1.SchemaTypes.String, required: true },
    description: { type: mongoose_1.SchemaTypes.String, required: true },
    price: { type: mongoose_1.SchemaTypes.Number, required: true },
};
const collectionName = 'products';
const productSchema = new mongoose_1.Schema(schema);
exports.Product = mongoose_1.models.product || (0, mongoose_1.model)(collectionName, productSchema);
//# sourceMappingURL=product.js.map