"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const http_status_codes_1 = require("../../shared/http-status-codes");
const api_client_1 = require("./api-client");
describe('Health check', () => {
    let response;
    let responseBody;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        const client = new api_client_1.ApiClient();
        response = (yield client.getHealthCheck());
        responseBody = JSON.parse(response.body);
    }));
    it('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, chai_1.expect)(response.statusCode).to.eql(http_status_codes_1.HttpStatusCode.Ok);
    }));
    it('should return success=true', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, chai_1.expect)(responseBody.success).to.eql(true);
    }));
    it('should return CORS headers', () => {
        const corsHeaderValue = response.headers['access-control-allow-origin'];
        (0, chai_1.expect)(corsHeaderValue).to.eql('*');
    });
});
//# sourceMappingURL=health.spec.js.map