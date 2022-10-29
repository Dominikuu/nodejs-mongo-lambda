import * as rp from 'request-promise-native';

export class ApiClient {
  private readonly _options: rp.RequestPromiseOptions;

  public constructor() {
    this._options = {
      baseUrl: 'https://epuwpyx4t2.execute-api.us-east-1.amazonaws.com/dev', // TODO: Get the baseUrl from config.
      method: 'GET',
      resolveWithFullResponse: true
    };
  }

  public getHealthCheck(): rp.RequestPromise {
    return rp('/health/check', this._options);
  }

  public getSwaggerJson(): rp.RequestPromise {
    return rp('/swagger.json', this._options);
  }
}
