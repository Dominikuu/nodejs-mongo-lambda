import { ForbiddenResult, NotFoundResult } from '../../shared/errors';
import { User, GetUserResult } from './user.interfaces';
import { UserRepository } from './user.repository';

export class UserService {
  public constructor(private readonly _repo: UserRepository, private readonly _env: NodeJS.ProcessEnv) {
  }

  public getUser(id: number): Promise<GetUserResult> {
    return new Promise((resolve: (result: GetUserResult) => void, reject: (reason: NotFoundResult) => void): void => {
      if (!this._repo.exists(id)) {
          reject(new NotFoundResult('UNKNOWN_CITY', 'There is no user with the specified ID!'));
          return;
      }

      if (!this._repo.hasAccess(id)) {
        reject(new ForbiddenResult('PERMISSION_REQUIRED', 'You have no permission to access the user with the specified ID!'));
        return;
      }

      const defaultCountry: string = this._env.DEFAULT_COUNTRY || 'Hungary';
      const user: User = this._repo.getUser(id, defaultCountry);
      const result: GetUserResult = {
        user
      };

      resolve(result);
    });
  }
}
