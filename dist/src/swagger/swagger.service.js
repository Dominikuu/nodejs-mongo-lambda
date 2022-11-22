"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerService = void 0;
const error_codes_1 = require("../../shared/error-codes");
const errors_1 = require("../../shared/errors");
class SwaggerService {
    constructor(_repo, _env) {
        this._repo = _repo;
        this._env = _env;
    }
    getSwaggerDescription() {
        if (!this._env.REST_API_NAME) {
            return Promise.reject(new errors_1.ConfigurationErrorResult(error_codes_1.ErrorCode.MissingEnv, 'The REST_API_NAME environment variable is missing!'));
        }
        if (!this._env.STAGE_NAME) {
            return Promise.reject(new errors_1.ConfigurationErrorResult(error_codes_1.ErrorCode.MissingEnv, 'The STAGE_NAME environment variable is missing!'));
        }
        if (!this._env.API_INFO_TITLE) {
            return Promise.reject(new errors_1.ConfigurationErrorResult(error_codes_1.ErrorCode.MissingEnv, 'The API_INFO_TITLE environment variable is missing!'));
        }
        if (!this._env.API_INFO_VERSION) {
            return Promise.reject(new errors_1.ConfigurationErrorResult(error_codes_1.ErrorCode.MissingEnv, 'The API_INFO_VERSION environment variable is missing!'));
        }
        /* tslint:disable:no-unnecessary-type-assertion - False positive */
        const restApiName = this._env.REST_API_NAME;
        const stageName = this._env.STAGE_NAME;
        const title = this._env.API_INFO_TITLE;
        const version = this._env.API_INFO_VERSION;
        /* tslint:enable:no-unnecessary-type-assertion */
        console.log(stageName, restApiName);
        return this._repo.getRestApiId(stageName, restApiName)
            .then((restApiId) => {
            if (!restApiId) {
                throw new errors_1.NotFoundResult(error_codes_1.ErrorCode.InvalidName, 'Cannot find the API with the specified name!');
            }
            return this._repo.getSwaggerDescription(restApiId, stageName);
        })
            .then((jsonDesc) => {
            const result = JSON.parse(jsonDesc);
            // Remove the /swagger.json path from the documentation.
            delete result.paths['/swagger.json'];
            // Remove the OPTIONS endpoints generated automatically because CORS is enabled.
            for (const pathName in result.paths) {
                if (result.paths[pathName].options) {
                    delete result.paths[pathName].options;
                }
            }
            // Update the 'info' properties in the header, because the API Gateway exports raw values instead of what is specified in the documentation.
            // This is a known issue with 'serverless-aws-documentation', read more in its README.
            result.info.title = title;
            result.info.version = version;
            return result;
        })
            .catch((error) => {
            if (error.code === 'AccessDeniedException') {
                throw new errors_1.ForbiddenResult(error_codes_1.ErrorCode.MissingPermission, error.message);
            }
            if (error instanceof errors_1.NotFoundResult) {
                throw error;
            }
            throw new errors_1.InternalServerErrorResult(error.name, error.message);
        });
    }
}
exports.SwaggerService = SwaggerService;
//# sourceMappingURL=swagger.service.js.map