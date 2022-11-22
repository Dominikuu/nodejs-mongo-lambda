"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const error_codes_1 = require("../../shared/error-codes");
const errors_1 = require("../../shared/errors");
const response_builder_1 = require("../../shared/response-builder");
class ProductController {
    constructor(_service) {
        this._service = _service;
        this.createProduct = (event, context, callback) => {
            context.callbackWaitsForEmptyEventLoop = false;
            const product = JSON.parse(event.body);
            this._service.createProduct(product)
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
        this.deleteProduct = (event, context, callback) => {
            context.callbackWaitsForEmptyEventLoop = false;
            // Input validation.
            if (!event.pathParameters || !event.pathParameters.id) {
                return response_builder_1.ResponseBuilder.badRequest(error_codes_1.ErrorCode.MissingId, 'Please specify the city ID!', callback);
            }
            const id = event.pathParameters.id;
            this._service.deleteProduct(id).then((result) => {
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
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map