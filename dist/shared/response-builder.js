"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseBuilder = void 0;
const error_codes_1 = require("./error-codes");
const errors_1 = require("./errors");
const http_status_codes_1 = require("./http-status-codes");
/**
 * Contains helper methods to generate a HTTP response.
 */
class ResponseBuilder {
    static badRequest(code, description, callback) {
        const errorResult = new errors_1.BadRequestResult(code, description);
        ResponseBuilder._returnAs(errorResult, http_status_codes_1.HttpStatusCode.BadRequest, callback);
    }
    static configurationError(code, description, callback) {
        const errorResult = new errors_1.ConfigurationErrorResult(code, description);
        ResponseBuilder._returnAs(errorResult, http_status_codes_1.HttpStatusCode.ConfigurationError, callback);
    }
    static forbidden(code, description, callback) {
        const errorResult = new errors_1.ForbiddenResult(code, description);
        ResponseBuilder._returnAs(errorResult, http_status_codes_1.HttpStatusCode.Forbidden, callback);
    }
    static internalServerError(error, callback) {
        const errorResult = new errors_1.InternalServerErrorResult(error_codes_1.ErrorCode.GeneralError, 'Sorry...');
        ResponseBuilder._returnAs(errorResult, http_status_codes_1.HttpStatusCode.InternalServerError, callback);
    }
    static notFound(code, description, callback) {
        const errorResult = new errors_1.NotFoundResult(code, description);
        ResponseBuilder._returnAs(errorResult, http_status_codes_1.HttpStatusCode.NotFound, callback);
    }
    static ok(result, callback) {
        ResponseBuilder._returnAs(result, http_status_codes_1.HttpStatusCode.Ok, callback);
    }
    static _returnAs(result, statusCode, callback) {
        const bodyObject = result instanceof errors_1.ErrorResult
            ? { error: result }
            : result;
        const response = {
            body: JSON.stringify(bodyObject),
            headers: {
                'Access-Control-Allow-Origin': '*' // This is required to make CORS work with AWS API Gateway Proxy Integration.
            },
            statusCode
        };
        callback(undefined, response);
    }
}
exports.ResponseBuilder = ResponseBuilder;
//# sourceMappingURL=response-builder.js.map