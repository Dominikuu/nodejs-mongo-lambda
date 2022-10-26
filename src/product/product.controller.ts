import { ApiCallback, ApiContext, ApiEvent, ApiHandler } from '../../shared/api.interfaces';
import { ErrorCode } from '../../shared/error-codes';
import { ErrorResult, ForbiddenResult, NotFoundResult } from '../../shared/errors';
import { ResponseBuilder } from '../../shared/response-builder';
import { GetProductResult } from './product.interfaces';
import { ProductService } from './product.service';

export class ProductController {
  public constructor(private readonly _service: ProductService) {
  }

  public getProduct: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback): void => {
    // Input validation.
    if (!event.pathParameters || !event.pathParameters.id) {
      return ResponseBuilder.badRequest(ErrorCode.MissingId, 'Please specify the city ID!', callback);
    }

    if (isNaN(+event.pathParameters.id)) {
      return ResponseBuilder.badRequest(ErrorCode.InvalidId, 'The city ID must be a number!', callback);
    }

    const id: number = +event.pathParameters.id;
    this._service.getProduct(id)
      .then((result: GetProductResult) => {
        return ResponseBuilder.ok<GetProductResult>(result, callback);  // tslint:disable-line arrow-return-shorthand
      })
      .catch((error: ErrorResult) => {
        if (error instanceof NotFoundResult) {
          return ResponseBuilder.notFound(error.code, error.description, callback);
        }

        if (error instanceof ForbiddenResult) {
          return ResponseBuilder.forbidden(error.code, error.description, callback);
        }

        return ResponseBuilder.internalServerError(error, callback);
      });
  }
  public createProduct: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback): void => {
    // Input validation.
    if (!event.pathParameters || !event.pathParameters.id) {
      return ResponseBuilder.badRequest(ErrorCode.MissingId, 'Please specify the city ID!', callback);
    }

    if (isNaN(+event.pathParameters.id)) {
      return ResponseBuilder.badRequest(ErrorCode.InvalidId, 'The city ID must be a number!', callback);
    }

    const id: number = +event.pathParameters.id;
    this._service.getProduct(id)
      .then((result: GetProductResult) => {
        return ResponseBuilder.ok<GetProductResult>(result, callback);  // tslint:disable-line arrow-return-shorthand
      })
      .catch((error: ErrorResult) => {
        if (error instanceof NotFoundResult) {
          return ResponseBuilder.notFound(error.code, error.description, callback);
        }

        if (error instanceof ForbiddenResult) {
          return ResponseBuilder.forbidden(error.code, error.description, callback);
        }

        return ResponseBuilder.internalServerError(error, callback);
      });
  }
  public deleteProduct: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback): void => {
    // Input validation.
    if (!event.pathParameters || !event.pathParameters.id) {
      return ResponseBuilder.badRequest(ErrorCode.MissingId, 'Please specify the city ID!', callback);
    }

    if (isNaN(+event.pathParameters.id)) {
      return ResponseBuilder.badRequest(ErrorCode.InvalidId, 'The city ID must be a number!', callback);
    }

    const id: number = +event.pathParameters.id;
    this._service.getProduct(id)
      .then((result: GetProductResult) => {
        return ResponseBuilder.ok<GetProductResult>(result, callback);  // tslint:disable-line arrow-return-shorthand
      })
      .catch((error: ErrorResult) => {
        if (error instanceof NotFoundResult) {
          return ResponseBuilder.notFound(error.code, error.description, callback);
        }

        if (error instanceof ForbiddenResult) {
          return ResponseBuilder.forbidden(error.code, error.description, callback);
        }

        return ResponseBuilder.internalServerError(error, callback);
      });
  }
}
