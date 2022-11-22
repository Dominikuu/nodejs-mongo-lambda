"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Gender = void 0;
const mongoose_1 = require("mongoose");
var Gender;
(function (Gender) {
    Gender["male"] = "male";
    Gender["female"] = "female";
    Gender["undisclosed"] = "undisclosed";
})(Gender = exports.Gender || (exports.Gender = {}));
const schema = {
    email: { type: mongoose_1.SchemaTypes.String, required: true, unique: true },
    first_name: { type: mongoose_1.SchemaTypes.String, required: true },
    last_name: { type: mongoose_1.SchemaTypes.String, required: true },
    // Gets the Mongoose enum from the TypeScript enum
    gender: { type: mongoose_1.SchemaTypes.String, enum: Object.values(Gender) },
    address: {
        street: { type: mongoose_1.SchemaTypes.String },
        city: { type: mongoose_1.SchemaTypes.String },
        post_code: { type: mongoose_1.SchemaTypes.String }
    }
};
const collectionName = 'users';
const userSchema = new mongoose_1.Schema(schema);
exports.User = mongoose_1.models.users || (0, mongoose_1.model)(collectionName, userSchema);
//# sourceMappingURL=user.js.map