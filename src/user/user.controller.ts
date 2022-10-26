import { ApiCallback, ApiContext, ApiEvent, ApiHandler } from '../../shared/api.interfaces';
import { ErrorCode } from '../../shared/error-codes';
import { ErrorResult, ForbiddenResult, NotFoundResult } from '../../shared/errors';
import { ResponseBuilder } from '../../shared/response-builder';
import { GetUserResult } from './user.interfaces';
import { UserService } from './user.service';
import {getConnection} from '../../database'

export class UserController {
  public constructor(private readonly _service: UserService) {
  }

  public getUser: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback): void => {

    // TEST
    getConnection().then(()=>{
      console.log('DB CONNECTED')
    })

    // Input validation.
    if (!event.pathParameters || !event.pathParameters.id) {
      return ResponseBuilder.badRequest(ErrorCode.MissingId, 'Please specify the user ID!', callback);
    }

    if (isNaN(+event.pathParameters.id)) {
      return ResponseBuilder.badRequest(ErrorCode.InvalidId, 'The user ID must be a number!', callback);
    }

    const id: number = +event.pathParameters.id;
    this._service.getUser(id)
      .then((result: GetUserResult) => {
        return ResponseBuilder.ok<GetUserResult>(result, callback);  // tslint:disable-line arrow-return-shorthand
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
  public createUser: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback): void => {
    return ResponseBuilder.badRequest(ErrorCode.MissingId, 'Please specify the user ID!', callback);
    getConnection().then(()=>{
      console.log('DB CONNECTED')
      return ResponseBuilder.badRequest(ErrorCode.MissingId, 'Please specify the user ID!', callback);
    })
    // Input validation.
    if (!event.pathParameters || !event.pathParameters.id) {
      return ResponseBuilder.badRequest(ErrorCode.MissingId, 'Please specify the user ID!', callback);
    }

    if (isNaN(+event.pathParameters.id)) {
      return ResponseBuilder.badRequest(ErrorCode.InvalidId, 'The user ID must be a number!', callback);
    }

    const id: number = +event.pathParameters.id;
    this._service.getUser(id)
      .then((result: GetUserResult) => {
        return ResponseBuilder.ok<GetUserResult>(result, callback);  // tslint:disable-line arrow-return-shorthand
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
  public deleteUser: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback): void => {
    // Input validation.
    if (!event.pathParameters || !event.pathParameters.id) {
      return ResponseBuilder.badRequest(ErrorCode.MissingId, 'Please specify the user ID!', callback);
    }

    if (isNaN(+event.pathParameters.id)) {
      return ResponseBuilder.badRequest(ErrorCode.InvalidId, 'The user ID must be a number!', callback);
    }

    const id: number = +event.pathParameters.id;
    this._service.getUser(id)
      .then((result: GetUserResult) => {
        return ResponseBuilder.ok<GetUserResult>(result, callback);  // tslint:disable-line arrow-return-shorthand
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
