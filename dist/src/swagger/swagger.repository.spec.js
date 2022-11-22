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
const swagger_repository_1 = require("./swagger.repository");
// tslint:disable no-unused-expression (Generates false alarms for mocha 'undefined' function.)
const chance = new chance_1.Chance();
describe('SwaggerRepository', () => {
    let repo;
    let testData;
    beforeEach(() => {
        testData = {
            restApiId: chance.word(),
            restApiName: chance.word(),
            stageName: chance.word(),
            swaggerDescription: chance.sentence()
        };
    });
    describe('getRestApiId function', () => {
        it('should resolve with the ID of the API with the matching name', () => __awaiter(void 0, void 0, void 0, function* () {
            const restApis = [
                { id: undefined, name: testData.stageName },
                { id: undefined, name: testData.restApiName },
                { id: chance.word(), name: testData.stageName },
                { id: chance.word(), name: testData.restApiName },
                { id: testData.restApiId, name: `${testData.stageName}-${testData.restApiName}` },
                { id: chance.word(), name: `${testData.stageName}-${testData.restApiName}` }
            ];
            createRepo(restApis);
            const id = yield repo.getRestApiId(testData.stageName, testData.restApiName);
            (0, chai_1.expect)(id).to.equal(testData.restApiId);
        }));
        it('should resolve with undefined ID, if the API cannot be found', () => __awaiter(void 0, void 0, void 0, function* () {
            const restApis = [
                { id: undefined, name: testData.stageName },
                { id: undefined, name: testData.restApiName },
                { id: chance.word(), name: testData.stageName },
                { id: chance.word(), name: testData.restApiName }
            ];
            createRepo(restApis);
            const id = yield repo.getRestApiId(testData.stageName, testData.restApiName);
            (0, chai_1.expect)(id).to.be.undefined;
        }));
        it('should resolve with undefined ID, if the there are no API created', () => __awaiter(void 0, void 0, void 0, function* () {
            const restApis = [];
            createRepo(restApis);
            const id = yield repo.getRestApiId(testData.stageName, testData.restApiName);
            (0, chai_1.expect)(id).to.be.undefined;
        }));
        it('should reject with the original AWS error', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = chance.sentence();
            const error = new Error(errorMessage);
            const restApis = [];
            createRepo(restApis, undefined, error);
            yield repo.getRestApiId(testData.stageName, testData.restApiName)
                .catch((err) => {
                (0, chai_1.expect)(err.message).to.equal(errorMessage);
            });
        }));
    });
    describe('getSwaggerDescription function', () => {
        it('should resolve with the Swagger description', () => __awaiter(void 0, void 0, void 0, function* () {
            createRepo([], testData.swaggerDescription);
            const swaggerDescription = yield repo.getSwaggerDescription(testData.restApiId, testData.stageName);
            (0, chai_1.expect)(swaggerDescription).to.equal(testData.swaggerDescription);
        }));
        it('should reject with the original AWS error', () => __awaiter(void 0, void 0, void 0, function* () {
            const errorMessage = chance.sentence();
            const error = new Error(errorMessage);
            createRepo([], testData.swaggerDescription, error);
            yield repo.getSwaggerDescription(testData.restApiId, testData.stageName)
                .catch((err) => {
                (0, chai_1.expect)(err.message).to.equal(errorMessage);
            });
        }));
    });
    function createRepo(restApis, swaggerDescription, error) {
        // NOTE: Manual mocking is used here, because mocking of the types in the AWS SDK is tricky, due to the fact that the SDK builds those objects dynamically based on a JSON definition.
        const apiGatewayMock = {
            getExport: (params, callback) => {
                const data = {
                    body: swaggerDescription
                };
                callback(error, data);
            },
            getRestApis: (callback) => {
                const data = {
                    items: restApis
                };
                callback(error, data);
            }
        };
        repo = new swagger_repository_1.SwaggerRepository(apiGatewayMock);
    }
});
//# sourceMappingURL=swagger.repository.spec.js.map