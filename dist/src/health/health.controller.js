"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const response_builder_1 = require("../../shared/response-builder");
class HealthController {
    constructor() {
        this.getHealthCheck = (event, context, callback) => {
            const result = {
                success: true
            };
            response_builder_1.ResponseBuilder.ok(result, callback);
        };
        this.getHealthCheckDetailed = (event, context, callback) => {
            const result = {
                requestId: event.requestContext.requestId,
                success: true
            };
            response_builder_1.ResponseBuilder.ok(result, callback);
        };
    }
}
exports.HealthController = HealthController;
//# sourceMappingURL=health.controller.js.map