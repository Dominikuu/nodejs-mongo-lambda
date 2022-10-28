import { ApiCallback, ApiContext, ApiEvent, ApiHandler } from '../../shared/api.interfaces';
import { ErrorCode } from '../../shared/error-codes';
import { ErrorResult, ForbiddenResult, NotFoundResult } from '../../shared/errors';
import { ResponseBuilder } from '../../shared/response-builder';
import { CreateOrderResult, GetOrderResult, ListOrdersResult, Order} from './order.interfaces';
import { OrderService } from './order.service';

export class OrderController {
  public constructor(private readonly _service: OrderService) {
  }
  public listOrders: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback): void => {
    this._service.listOrders()
      .then((result: ListOrdersResult) => {
        return ResponseBuilder.ok<ListOrdersResult>(result, callback);  // tslint:disable-line arrow-return-shorthand
      })
      .catch ((error: ErrorResult) => {
        if (error instanceof NotFoundResult) {
          return ResponseBuilder.notFound(error.code, error.description, callback);
        }

        if (error instanceof ForbiddenResult) {
          return ResponseBuilder.forbidden(error.code, error.description, callback);
        }

        return ResponseBuilder.internalServerError(error, callback);
      });
  }
  public getOrder: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback): void => {
    // Input validation.
    if (!event.pathParameters || !event.pathParameters.id) {
      return ResponseBuilder.badRequest(ErrorCode.MissingId, 'Please specify the order ID!', callback);
    }

    const id: string = event.pathParameters.id;
    this._service.getOrder(id)
      .then((result: GetOrderResult) => {
        return ResponseBuilder.ok<GetOrderResult>(result, callback);  // tslint:disable-line arrow-return-shorthand
      })
      .catch ((error: ErrorResult) => {
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
    const order: Order = JSON.parse(event.body as string)

    this._service.createOrder(order)
      .then((result: CreateOrderResult) => {
        return ResponseBuilder.ok<CreateOrderResult>(result, callback);  // tslint:disable-line arrow-return-shorthand
      })
      .catch ((error: ErrorResult) => {
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
