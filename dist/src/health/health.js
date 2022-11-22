"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealthCheckDetailed = exports.getHealthCheck = void 0;
const health_controller_1 = require("./health.controller");
const controller = new health_controller_1.HealthController();
exports.getHealthCheck = controller.getHealthCheck;
exports.getHealthCheckDetailed = controller.getHealthCheckDetailed;
//# sourceMappingURL=health.js.map