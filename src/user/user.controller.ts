import { ApiCallback, ApiContext, ApiEvent, ApiHandler } from '../../shared/api.interfaces';
import { ErrorCode } from '../../shared/error-codes';
import { BadRequestResult, ErrorResult, ForbiddenResult, NotFoundResult } from '../../shared/errors';
import { ResponseBuilder } from '../../shared/response-builder';
import { User, CreateUserResult, DeleteUserResult } from './user.interfaces';
import { UserService } from './user.service';

export class UserController {
  public constructor(private readonly _service: UserService) {
  }

  public createUser: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback): void => {
    context.callbackWaitsForEmptyEventLoop = false;
    const user: User = JSON.parse(event.body as string)
    this._service.createUser(user)
      .then((result: CreateUserResult) => {
        return ResponseBuilder.ok<CreateUserResult>(result, callback);  // tslint:disable-line arrow-return-shorthand
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
  public deleteUser: ApiHandler = (event: ApiEvent, context: ApiContext, callback: ApiCallback): void => {
    context.callbackWaitsForEmptyEventLoop = false
    // Input validation.
    if (!event.pathParameters || !event.pathParameters.id) {
      return ResponseBuilder.badRequest(ErrorCode.MissingId, 'Please specify the user ID!', callback);
    }

    const id: string = event.pathParameters.id;
    this._service.deleteUser(id)
      .then((result: DeleteUserResult) => {
        return ResponseBuilder.ok<DeleteUserResult>(result, callback);  // tslint:disable-line arrow-return-shorthand
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
