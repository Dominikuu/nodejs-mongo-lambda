"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const error_codes_1 = require("../../shared/error-codes");
const errors_1 = require("../../shared/errors");
const response_builder_1 = require("../../shared/response-builder");
class UserController {
    constructor(_service) {
        this._service = _service;
        this.createUser = (event, context, callback) => {
            context.callbackWaitsForEmptyEventLoop = false;
            const user = JSON.parse(event.body);
            this._service.createUser(user)
                .then((result) => {
                return response_builder_1.ResponseBuilder.ok(result, callback); // tslint:disable-line arrow-return-shorthand
            })
                .catch((error) => {
                if (error instanceof errors_1.NotFoundResult) {
                    return response_builder_1.ResponseBuilder.notFound(error.code, error.description, callback);
                }
                if (error instanceof errors_1.ForbiddenResult) {
                    return response_builder_1.ResponseBuilder.forbidden(error.code, error.description, callback);
                }
                if (error instanceof errors_1.BadRequestResult) {
                    return response_builder_1.ResponseBuilder.forbidden(error.code, error.description, callback);
                }
                return response_builder_1.ResponseBuilder.internalServerError(error, callback);
            });
        };
        this.deleteUser = (event, context, callback) => {
            context.callbackWaitsForEmptyEventLoop = false;
            // Input validation.
            if (!event.pathParameters || !event.pathParameters.id) {
                return response_builder_1.ResponseBuilder.badRequest(error_codes_1.ErrorCode.MissingId, 'Please specify the user ID!', callback);
            }
            const id = event.pathParameters.id;
            this._service.deleteUser(id)
                .then((result) => {
                return response_builder_1.ResponseBuilder.ok(result, callback); // tslint:disable-line arrow-return-shorthand
            })
                .catch((error) => {
                if (error instanceof errors_1.NotFoundResult) {
                    return response_builder_1.ResponseBuilder.notFound(error.code, error.description, callback);
                }
                if (error instanceof errors_1.ForbiddenResult) {
                    return response_builder_1.ResponseBuilder.forbidden(error.code, error.description, callback);
                }
                return response_builder_1.ResponseBuilder.internalServerError(error, callback);
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map