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
exports.UserService = void 0;
const errors_1 = require("../../shared/errors");
const database_1 = require("../../database");
const user_1 = require("../../database/model/user");
class UserService {
    constructor() {
        (0, database_1.connectDB)();
    }
    createUser(user) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const target = yield user_1.User.findOne({ email: user.email }).exec();
                if (target) {
                    reject(new errors_1.BadRequestResult('CREATE_DENIED', "Email duplicated"));
                    return;
                }
                const { id } = yield user_1.User.create(new user_1.User(user));
                const result = {
                    id
                };
                resolve(result);
            }
            catch (errors) {
                reject(new errors_1.ConfigurationErrorResult('CREATE_DENINED', 'You have no permission to access the user with the specified ID!'));
            }
        }));
    }
    deleteUser(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const target = yield user_1.User.findById(id).exec();
                if (!target) {
                    reject(new errors_1.BadRequestResult('DELETE_DENIED', "Target product isn't existed"));
                    return;
                }
                yield user_1.User.deleteOne({ id }).exec();
                const result = {
                    message: 'DELETE USER ' + id
                };
                resolve(result);
            }
            catch (errors) {
                reject(new errors_1.ConfigurationErrorResult('DELETE_DENIED', errors));
            }
        }));
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map