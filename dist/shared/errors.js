"use strict";
// tslint:disable max-classes-per-file (Many simple inherited classes.)
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundResult = exports.InternalServerErrorResult = exports.ForbiddenResult = exports.ConfigurationErrorResult = exports.BadRequestResult = exports.ErrorResult = void 0;
class ErrorResult extends Error {
    constructor(code, description) {
        super(description);
        this.code = code;
        this.description = description;
    }
}
exports.ErrorResult = ErrorResult;
class BadRequestResult extends ErrorResult {
}
exports.BadRequestResult = BadRequestResult;
class ConfigurationErrorResult extends ErrorResult {
}
exports.ConfigurationErrorResult = ConfigurationErrorResult;
class ForbiddenResult extends ErrorResult {
}
exports.ForbiddenResult = ForbiddenResult;
class InternalServerErrorResult extends ErrorResult {
}
exports.InternalServerErrorResult = InternalServerErrorResult;
class NotFoundResult extends ErrorResult {
}
exports.NotFoundResult = NotFoundResult;
// tslint:enable
//# sourceMappingURL=errors.js.map