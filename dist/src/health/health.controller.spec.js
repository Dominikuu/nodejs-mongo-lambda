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
const chance_1 = require("chance");
const http_status_codes_1 = require("../../shared/http-status-codes");
const test_1 = require("../../test");
const health_controller_1 = require("./health.controller");
const chance = new chance_1.Chance();
describe('HealthController', () => {
    let controller;
    beforeEach(() => {
        controller = new health_controller_1.HealthController();
    });
    describe('getHealthCheck function', () => {
        it('should return HTTP 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, test_1.callSuccess)(controller.getHealthCheck);
            (0, chai_1.expect)(response.statusCode).to.equal(http_status_codes_1.HttpStatusCode.Ok);
        }));
        it('should return success', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, test_1.callSuccess)(controller.getHealthCheck);
            (0, chai_1.expect)(response.parsedBody.success).to.equal(true);
        }));
    });
    describe('getHealthCheckDetailed function', () => {
        let testData;
        beforeEach(() => {
            testData = {
                requestId: chance.word()
            };
        });
        it('should return HTTP 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield callSuccessDetailed(controller.getHealthCheckDetailed, testData.requestId);
            (0, chai_1.expect)(response.statusCode).to.equal(http_status_codes_1.HttpStatusCode.Ok);
        }));
        it('should return success', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield callSuccessDetailed(controller.getHealthCheckDetailed, testData.requestId);
            (0, chai_1.expect)(response.parsedBody.success).to.equal(true);
        }));
        it('should return the request ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield callSuccessDetailed(controller.getHealthCheckDetailed, testData.requestId);
            (0, chai_1.expect)(response.parsedBody.requestId).to.equal(testData.requestId);
        }));
        // tslint:disable-next-line arrow-return-shorthand (Long function body.)
        function callSuccessDetailed(handler, requestId) {
            // tslint:disable-next-line typedef (Well-known constructor.)
            return new Promise((resolve, reject) => {
                let event = {};
                if (requestId) {
                    event = {
                        requestContext: {
                            requestId
                        }
                    };
                }
                handler(event, {}, (error, result) => {
                    if (typeof result === 'undefined') {
                        reject('No result was returned by the handler!');
                        return;
                    }
                    const parsedResult = result;
                    parsedResult.parsedBody = JSON.parse(result.body);
                    resolve(parsedResult);
                });
            });
        }
    });
});
//# sourceMappingURL=health.controller.spec.js.map