import { ApiCallback, ApiContext, ApiEvent, ApiHandler } from '../../shared/api.interfaces';
import { ErrorCode } from '../../shared/error-codes';
import { BadRequestResult, ErrorResult, ForbiddenResult, NotFoundResult } from '../../shared/errors';
import { ResponseBuilder } from '../../shared/response-builder';
import { CreateProductResult, DeleteProductResult, Product } from './product.interfaces';
import { ProductService } from './product.service';

export class ProductController {
  public constructor(private readonly _service: ProductService) {
  }
  public createProduct: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback): void => {
    context.callbackWaitsForEmptyEventLoop = false
    const product: Product = JSON.parse(event.body as string)
    this._service.createProduct(product)
      .then((result: CreateProductResult) => {
        return ResponseBuilder.ok<CreateProductResult>(result, callback);  // tslint:disable-line arrow-return-shorthand
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
  public deleteProduct: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback): void => {
    context.callbackWaitsForEmptyEventLoop = false
    // Input validation.
    if (!event.pathParameters || !event.pathParameters.id) {
      return ResponseBuilder.badRequest(ErrorCode.MissingId, 'Please specify the city ID!', callback);
    }

    const id: string = event.pathParameters.id;
    this._service.deleteProduct(id).then((result: DeleteProductResult) => {
        return ResponseBuilder.ok<DeleteProductResult>(result, callback);  // tslint:disable-line arrow-return-shorthand
      })
      .catch ((error: ErrorResult) => {
        if (error instanceof NotFoundResult) {
          return ResponseBuilder.notFound(error.code, error.description, callback);
        }

        if (error instanceof ForbiddenResult) {
          return ResponseBuilder.forbidden(error.code, error.description, callback);
        }

        if (error instanceof BadRequestResult) {
          return ResponseBuilder.forbidden(error.code, error.description, callback);
        }

        return ResponseBuilder.internalServerError(error, callback);
      });
  }
}
