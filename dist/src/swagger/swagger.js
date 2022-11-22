"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSwaggerJson = void 0;
const aws_sdk_1 = require("aws-sdk");
const swagger_controller_1 = require("./swagger.controller");
const swagger_repository_1 = require("./swagger.repository");
const swagger_service_1 = require("./swagger.service");
// This workaround is required becase Serverless Offline does not set environment variables properly.
// See: https://github.com/dherault/serverless-offline/issues/189
const defaultRegion = (process.env.REGION_NAME || process.env.AWS_REGION);
const apiGateway = new aws_sdk_1.APIGateway({ region: defaultRegion });
const repo = new swagger_repository_1.SwaggerRepository(apiGateway);
const service = new swagger_service_1.SwaggerService(repo, process.env);
const controller = new swagger_controller_1.SwaggerController(service);
exports.getSwaggerJson = controller.getSwaggerJson;
//# sourceMappingURL=swagger.js.map