"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const error_codes_1 = require("../../shared/error-codes");
const errors_1 = require("../../shared/errors");
const response_builder_1 = require("../../shared/response-builder");
class OrderController {
    constructor(_service) {
        this._service = _service;
        this.listOrders = (event, context, callback) => {
            context.callbackWaitsForEmptyEventLoop = false;
            this._service.listOrders().then((result) => {
                return response_builder_1.ResponseBuilder.ok(result, callback); // tslint:disable-line arrow-return-shorthand
            }).catch((error) => {
                if (error instanceof errors_1.NotFoundResult) {
                    return response_builder_1.ResponseBuilder.notFound(error.code, error.description, callback);
                }
                if (error instanceof errors_1.ForbiddenResult) {
                    return response_builder_1.ResponseBuilder.forbidden(error.code, error.description, callback);
                }
                return response_builder_1.ResponseBuilder.internalServerError(error, callback);
            });
        };
        this.getOrder = (event, context, callback) => {
            context.callbackWaitsForEmptyEventLoop = false;
            // Input validation.
            if (!event.pathParameters || !event.pathParameters.id) {
                return response_builder_1.ResponseBuilder.badRequest(error_codes_1.ErrorCode.MissingId, 'Please specify the order ID!', callback);
            }
            const id = event.pathParameters.id;
            this._service.getOrder(id).then((result) => {
                return response_builder_1.ResponseBuilder.ok(result, callback); // tslint:disable-line arrow-return-shorthand
            }).catch((error) => {
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
        this.createOrder = (event, context, callback) => {
            context.callbackWaitsForEmptyEventLoop = false;
            // Input validation.
            const order = JSON.parse(event.body);
            this._service.createOrder(order)
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
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map