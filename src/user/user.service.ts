import { ForbiddenResult, NotFoundResult } from '../../shared/errors';
import { User, GetUserResult } from './user.interfaces';
import { UserRepository } from './user.repository';
import {connectDB} from '../../database'
import UserModel from '../../database/model/user'
export class UserService {
  public constructor(private readonly _repo: UserRepository, private readonly _env: NodeJS.ProcessEnv) {

  }

  public getUser(id: string): Promise<GetUserResult> {
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
  public createUser(user: User): Promise<GetUserResult> {
    return new Promise((resolve: (result: GetUserResult) => void, reject: (reason: NotFoundResult) => void): void => {
      connectDB()
      // getConnection().then((conn)=>{
      //   console.log('GET CONNECTION')
      UserModel.create(user, function(err: any, users: any) {
        console.log(err, users)
      })

      // })
      // if (!this._repo.exists(id)) {
      //     reject(new NotFoundResult('UNKNOWN_CITY', 'There is no user with the specified ID!'));
      //     return;
      // }

      // if (!this._repo.hasAccess(id)) {
      //   reject(new ForbiddenResult('PERMISSION_REQUIRED', 'You have no permission to access the user with the specified ID!'));
      //   return;
      // }

      const defaultCountry: string = this._env.DEFAULT_COUNTRY || 'Hungary';
      const user: User = this._repo.getUser(id, defaultCountry);
      const result: GetUserResult = {
        user
      };

      resolve(result);
    });
  }
  public deleteUser(id: string): Promise<GetUserResult> {
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
