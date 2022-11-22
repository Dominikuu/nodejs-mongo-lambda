"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerRepository = void 0;
class SwaggerRepository {
    constructor(_apigw) {
        this._apigw = _apigw;
    }
    getRestApiId(stageName, apiName) {
        return new Promise((resolve, reject) => {
            this._apigw.getRestApis((error, data) => {
                if (error) {
                    reject(error);
                    return;
                }
                const targetApiName = `${stageName}-${apiName}`;
                if (data.items && data.items.length > 0) {
                    const matchingApi = data.items.find((api) => api.name === targetApiName);
                    resolve(matchingApi ? matchingApi.id : undefined);
                }
                resolve();
            });
        });
    }
    getSwaggerDescription(restApiId, stageName) {
        return new Promise((resolve, reject) => {
            const params = {
                accepts: 'application/json',
                exportType: 'swagger',
                restApiId,
                stageName
            };
            this._apigw.getExport(params, (error, data) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(data.body);
            });
        });
    }
}
exports.SwaggerRepository = SwaggerRepository;
//# sourceMappingURL=swagger.repository.js.map