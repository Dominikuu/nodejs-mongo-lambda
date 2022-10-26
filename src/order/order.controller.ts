import { ApiCallback, ApiContext, ApiEvent, ApiHandler } from '../../shared/api.interfaces';
import { ErrorCode } from '../../shared/error-codes';
import { ErrorResult, ForbiddenResult, NotFoundResult } from '../../shared/errors';
import { ResponseBuilder } from '../../shared/response-builder';
import { GetOrderResult } from './order.interfaces';
import { OrderService } from './order.service';

export class OrderController {
  public constructor(private readonly _service: OrderService) {
  }

  public getOrder: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback): void => {
    // Input validation.
    if (!event.pathParameters || !event.pathParameters.id) {
      return ResponseBuilder.badRequest(ErrorCode.MissingId, 'Please specify the order ID!', callback);
    }

    if (isNaN(+event.pathParameters.id)) {
      return ResponseBuilder.badRequest(ErrorCode.InvalidId, 'The order ID must be a number!', callback);
    }

    const id: number = +event.pathParameters.id;
    this._service.getOrder(id)
      .then((result: GetOrderResult) => {
        return ResponseBuilder.ok<GetOrderResult>(result, callback);  // tslint:disable-line arrow-return-shorthand
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
  public createOrder: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback): void => {
    // Input validation.
    if (!event.pathParameters || !event.pathParameters.id) {
      return ResponseBuilder.badRequest(ErrorCode.MissingId, 'Please specify the order ID!', callback);
    }

    if (isNaN(+event.pathParameters.id)) {
      return ResponseBuilder.badRequest(ErrorCode.InvalidId, 'The order ID must be a number!', callback);
    }

    const id: number = +event.pathParameters.id;
    this._service.getOrder(id)
      .then((result: GetOrderResult) => {
        return ResponseBuilder.ok<GetOrderResult>(result, callback);  // tslint:disable-line arrow-return-shorthand
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
