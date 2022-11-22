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
const swagger_repository_1 = require("./swagger.repository");
const swagger_service_1 = require("./swagger.service");
// tslint:disable no-unsafe-any (Generates false alarm for ts-mockito functions.)
// tslint:disable no-unused-expression (Generates false alarms for mocha 'undefined' function.)
const chance = new chance_1.Chance();
describe('SwaggerService', () => {
    const swaggerRepositoryMock = (0, ts_mockito_1.mock)(swagger_repository_1.SwaggerRepository);
    const swaggerRepositoryMockInstance = (0, ts_mockito_1.instance)(swaggerRepositoryMock);
    let service;
    let testData;
    let testSwaggerDocJson;
    beforeEach(() => {
        (0, ts_mockito_1.reset)(swaggerRepositoryMock);
        service = new swagger_service_1.SwaggerService(swaggerRepositoryMockInstance, process.env);
        testData = {
            restApiId: chance.word(),
            restApiName: chance.word(),
            stageName: chance.word(),
            swaggerDoc: {
                info: {
                    title: chance.sentence(),
                    version: chance.word(),
                },
                paths: {
                    '/cities': {
                        get: {},
                        options: {},
                        post: {}
                    },
                    '/continents': {
                        get: {},
                        options: {},
                        post: {}
                    },
                    '/countries': {
                        get: {}
                    },
                    '/swagger.json': {}
                }
            }
        };
        testSwaggerDocJson = JSON.stringify(testData.swaggerDoc);
        process.env.REST_API_NAME = testData.restApiName;
        process.env.STAGE_NAME = testData.stageName;
        process.env.API_INFO_TITLE = testData.swaggerDoc.info.title;
        process.env.API_INFO_VERSION = testData.swaggerDoc.info.version;
    });
    describe('getSwaggerDescription function', () => {
        it('should resolve with API info from the environment variables', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, ts_mockito_1.when)(swaggerRepositoryMock.getRestApiId(testData.stageName, testData.restApiName)).thenReturn(Promise.resolve(testData.restApiId));
            (0, ts_mockito_1.when)(swaggerRepositoryMock.getSwaggerDescription(testData.restApiId, testData.stageName)).thenReturn(Promise.resolve(testSwaggerDocJson));
            const result = yield service.getSwaggerDescription();
            (0, chai_1.expect)(result.info.title).to.equal(testData.swaggerDoc.info.title);
            (0, chai_1.expect)(result.info.version).to.equal(testData.swaggerDoc.info.version);
            (0, chai_1.expect)(result.paths['/cities'].get).to.not.be.undefined;
            (0, chai_1.expect)(result.paths['/cities'].post).to.not.be.undefined;
            (0, chai_1.expect)(result.paths['/continents'].get).to.not.be.undefined;
            (0, chai_1.expect)(result.paths['/continents'].post).to.not.be.undefined;
            (0, chai_1.expect)(result.paths['/countries'].get).to.not.be.undefined;
        }));
        it('should resolve without the swagger.json endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, ts_mockito_1.when)(swaggerRepositoryMock.getRestApiId(testData.stageName, testData.restApiName)).thenReturn(Promise.resolve(testData.restApiId));
            (0, ts_mockito_1.when)(swaggerRepositoryMock.getSwaggerDescription(testData.restApiId, testData.stageName)).thenReturn(Promise.resolve(testSwaggerDocJson));
            const result = yield service.getSwaggerDescription();
            (0, chai_1.expect)(result.paths['/swagger.json']).to.be.undefined;
        }));
        it('should resolve without the OPTIONS endpoints', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, ts_mockito_1.when)(swaggerRepositoryMock.getRestApiId(testData.stageName, testData.restApiName)).thenReturn(Promise.resolve(testData.restApiId));
            (0, ts_mockito_1.when)(swaggerRepositoryMock.getSwaggerDescription(testData.restApiId, testData.stageName)).thenReturn(Promise.resolve(testSwaggerDocJson));
            const result = yield service.getSwaggerDescription();
            (0, chai_1.expect)(result.paths['/cities'].options).to.be.undefined;
            (0, chai_1.expect)(result.paths['/countries'].options).to.be.undefined;
        }));
        it('should reject without the REST_API_NAME in the environment', () => {
            process.env.REST_API_NAME = '';
            service.getSwaggerDescription()
                .catch((error) => {
                (0, chai_1.expect)(error).instanceof(errors_1.ConfigurationErrorResult);
                (0, chai_1.expect)(error.code).to.equal(error_codes_1.ErrorCode.MissingEnv);
                (0, chai_1.expect)(error.description).to.include('REST_API_NAME');
            });
        });
        it('should reject without the STAGE_NAME in the environment', () => {
            process.env.STAGE_NAME = '';
            service.getSwaggerDescription()
                .catch((error) => {
                (0, chai_1.expect)(error).instanceof(errors_1.ConfigurationErrorResult);
                (0, chai_1.expect)(error.code).to.equal(error_codes_1.ErrorCode.MissingEnv);
                (0, chai_1.expect)(error.description).to.include('STAGE_NAME');
            });
        });
        it('should reject without the API_INFO_TITLE in the environment', () => {
            process.env.API_INFO_TITLE = '';
            service.getSwaggerDescription()
                .catch((error) => {
                (0, chai_1.expect)(error).instanceof(errors_1.ConfigurationErrorResult);
                (0, chai_1.expect)(error.code).to.equal(error_codes_1.ErrorCode.MissingEnv);
                (0, chai_1.expect)(error.description).to.include('API_INFO_TITLE');
            });
        });
        it('should reject without the API_INFO_VERSION in the environment', () => {
            process.env.API_INFO_VERSION = '';
            service.getSwaggerDescription()
                .catch((error) => {
                (0, chai_1.expect)(error).instanceof(errors_1.ConfigurationErrorResult);
                (0, chai_1.expect)(error.code).to.equal(error_codes_1.ErrorCode.MissingEnv);
                (0, chai_1.expect)(error.description).to.include('API_INFO_VERSION');
            });
        });
        it('should reject for non-existing API', () => {
            (0, ts_mockito_1.when)(swaggerRepositoryMock.getRestApiId(testData.stageName, testData.restApiName)).thenReturn(Promise.resolve(''));
            service.getSwaggerDescription()
                .catch((error) => {
                (0, chai_1.expect)(error).instanceof(errors_1.NotFoundResult);
                (0, chai_1.expect)(error.code).to.equal(error_codes_1.ErrorCode.InvalidName);
            });
        });
        it('should reject for insufficient permissions', () => {
            const awsError = new Error();
            awsError.code = 'AccessDeniedException';
            (0, ts_mockito_1.when)(swaggerRepositoryMock.getRestApiId(testData.stageName, testData.restApiName)).thenReturn(Promise.reject(awsError));
            service.getSwaggerDescription()
                .catch((error) => {
                (0, chai_1.expect)(error).instanceof(errors_1.ForbiddenResult);
                (0, chai_1.expect)(error.code).to.equal(error_codes_1.ErrorCode.MissingPermission);
            });
        });
        it('should reject if the getRestApiId repository call fails', () => {
            (0, ts_mockito_1.when)(swaggerRepositoryMock.getRestApiId(testData.stageName, testData.restApiName)).thenReturn(Promise.reject(new Error()));
            service.getSwaggerDescription()
                .catch((error) => {
                (0, chai_1.expect)(error).instanceof(errors_1.InternalServerErrorResult);
            });
        });
        it('should reject if the getSwaggerDescription repository call fails', () => {
            (0, ts_mockito_1.when)(swaggerRepositoryMock.getRestApiId(testData.stageName, testData.restApiName)).thenReturn(Promise.resolve(testData.restApiId));
            (0, ts_mockito_1.when)(swaggerRepositoryMock.getSwaggerDescription(testData.restApiId, testData.stageName)).thenReturn(Promise.reject(new Error()));
            service.getSwaggerDescription()
                .catch((error) => {
                (0, chai_1.expect)(error).instanceof(errors_1.InternalServerErrorResult);
            });
        });
    });
});
//# sourceMappingURL=swagger.service.spec.js.map