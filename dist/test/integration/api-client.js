"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClient = void 0;
const rp = require("request-promise-native");
class ApiClient {
    constructor() {
        this._options = {
            baseUrl: 'https://epuwpyx4t2.execute-api.us-east-1.amazonaws.com/dev',
            method: 'GET',
            resolveWithFullResponse: true
        };
    }
    getHealthCheck() {
        return rp('/health/check', this._options);
    }
    getSwaggerJson() {
        return rp('/swagger.json', this._options);
    }
}
exports.ApiClient = ApiClient;
//# sourceMappingURL=api-client.js.map