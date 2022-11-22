"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callFailure = exports.callSuccess = void 0;
// tslint:disable-next-line arrow-return-shorthand (Long function body.)
const callSuccess = (handler, pathParameters) => {
    // tslint:disable-next-line typedef (Well-known constructor.)
    return new Promise((resolve, reject) => {
        const event = {};
        if (pathParameters) {
            event.pathParameters = pathParameters;
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
};
exports.callSuccess = callSuccess;
// tslint:disable-next-line arrow-return-shorthand (Long function body.)
const callFailure = (handler, pathParameters) => {
    // tslint:disable-next-line typedef (Well-known constructor.)
    return new Promise((resolve, reject) => {
        const event = {};
        if (pathParameters) {
            event.pathParameters = pathParameters;
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
};
exports.callFailure = callFailure;
//# sourceMappingURL=index.js.map