"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerController = void 0;
const errors_1 = require("../../shared/errors");
const response_builder_1 = require("../../shared/response-builder");
class SwaggerController {
    constructor(_service) {
        this._service = _service;
        this.getSwaggerJson = (event, context, callback) => {
            this._service.getSwaggerDescription()
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
                if (error instanceof errors_1.ConfigurationErrorResult) {
                    return response_builder_1.ResponseBuilder.configurationError(error.code, error.description, callback);
                }
                return response_builder_1.ResponseBuilder.internalServerError(error, callback);
            });
        };
    }
}
exports.SwaggerController = SwaggerController;
//# sourceMappingURL=swagger.controller.js.map