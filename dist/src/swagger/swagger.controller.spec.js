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
const ts_mockito_1 = require("ts-mockito");
const error_codes_1 = require("../../shared/error-codes");
const errors_1 = require("../../shared/errors");
const http_status_codes_1 = require("../../shared/http-status-codes");
const test_1 = require("../../test");
const swagger_controller_1 = require("./swagger.controller");
const swagger_service_1 = require("./swagger.service");
// tslint:disable no-unsafe-any (Generates false alarm with ts-mockito functions.)
const chance = new chance_1.Chance();
describe('SwaggerController', () => {
    const swaggerServiceMock = (0, ts_mockito_1.mock)(swagger_service_1.SwaggerService);
    let controller;
    let testData;
    beforeEach(() => {
        (0, ts_mockito_1.reset)(swaggerServiceMock);
        const citiesServiceMockInstance = (0, ts_mockito_1.instance)(swaggerServiceMock);
        controller = new swagger_controller_1.SwaggerController(citiesServiceMockInstance);
        testData = {
            error: {
                code: chance.word(),
                description: chance.sentence()
            },
            swaggerDoc: {
                info: {
                    title: chance.sentence(),
                    version: chance.word(),
                },
                paths: {}
            }
        };
    });
    describe('getSwaggerJson function', () => {
        describe('success', () => {
            it('should return HTTP 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
                (0, ts_mockito_1.when)(swaggerServiceMock.getSwaggerDescription()).thenReturn(Promise.resolve(testData.swaggerDoc));
                const response = yield (0, test_1.callSuccess)(controller.getSwaggerJson);
                (0, chai_1.expect)(response.statusCode).to.equal(http_status_codes_1.HttpStatusCode.Ok);
            }));
            it('should return the info properties from the service', () => __awaiter(void 0, void 0, void 0, function* () {
                (0, ts_mockito_1.when)(swaggerServiceMock.getSwaggerDescription()).thenReturn(Promise.resolve(testData.swaggerDoc));
                const response = yield (0, test_1.callSuccess)(controller.getSwaggerJson);
                (0, chai_1.expect)(response.parsedBody.info.title).to.equal(testData.swaggerDoc.info.title);
                (0, chai_1.expect)(response.parsedBody.info.version).to.equal(testData.swaggerDoc.info.version);
            }));
        });
        describe('service failures', () => {
            it('should return Configuration Error for improper configuration', () => __awaiter(void 0, void 0, void 0, function* () {
                const errorResult = new errors_1.ConfigurationErrorResult(error_codes_1.ErrorCode.GeneralError, 'Sorry...');
                (0, ts_mockito_1.when)(swaggerServiceMock.getSwaggerDescription()).thenReturn(Promise.reject(errorResult));
                yield callAndCheckError(http_status_codes_1.HttpStatusCode.ConfigurationError, errorResult);
            }));
            it('should return Forbidden for insufficient permission', () => __awaiter(void 0, void 0, void 0, function* () {
                const errorResult = new errors_1.ForbiddenResult(testData.error.code, testData.error.description);
                (0, ts_mockito_1.when)(swaggerServiceMock.getSwaggerDescription()).thenReturn(Promise.reject(errorResult));
                yield callAndCheckError(http_status_codes_1.HttpStatusCode.Forbidden, errorResult);
            }));
            it('should return Not Found for a non-existing API', () => __awaiter(void 0, void 0, void 0, function* () {
                const errorResult = new errors_1.NotFoundResult(testData.error.code, testData.error.description);
                (0, ts_mockito_1.when)(swaggerServiceMock.getSwaggerDescription()).thenReturn(Promise.reject(errorResult));
                yield callAndCheckError(http_status_codes_1.HttpStatusCode.NotFound, errorResult);
            }));
            it('should return Internal Server Error for a service failure', () => __awaiter(void 0, void 0, void 0, function* () {
                const errorResult = new errors_1.InternalServerErrorResult(error_codes_1.ErrorCode.GeneralError, 'Sorry...');
                (0, ts_mockito_1.when)(swaggerServiceMock.getSwaggerDescription()).thenReturn(Promise.reject(new Error()));
                yield callAndCheckError(http_status_codes_1.HttpStatusCode.InternalServerError, errorResult);
            }));
        });
        function callAndCheckError(expectedHttpStatusCode, errorResult) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield (0, test_1.callFailure)(controller.getSwaggerJson);
                (0, chai_1.expect)(response.statusCode).to.equal(expectedHttpStatusCode);
                (0, chai_1.expect)(response.parsedBody.error.code).to.equal(errorResult.code);
                (0, chai_1.expect)(response.parsedBody.error.description).to.equal(errorResult.description);
            });
        }
    });
});
//# sourceMappingURL=swagger.controller.spec.js.map