"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.MONGO_URI;
const mongoose_1 = require("mongoose");
function connectDB() {
    (0, mongoose_1.connect)(uri, { useNewUrlParser: true })
        .then(() => {
        console.info(`Connected to database...`);
    })
        .catch((error) => {
        console.error('failed to connect', error);
    });
}
exports.connectDB = connectDB;
//# sourceMappingURL=index.js.map