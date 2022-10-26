import { NotFoundResult } from '../../shared/errors';
import { User, CreateUserResult, DeleteUserResult } from './user.interfaces';
import {connectDB} from '../../database'
import UserModel from '../../database/model/user'
export class UserService {
  public constructor(private readonly _env: NodeJS.ProcessEnv) {

  }

  public createUser(user: User): Promise<CreateUserResult> {
    
    return new Promise(async(resolve: (result: CreateUserResult) => void, reject: (reason: NotFoundResult) => void): void => {
      connectDB()
      // getConnection().then((conn)=>{
      //   console.log('GET CONNECTION')
      console.log(user)
      const {id} = await UserModel.create(new UserModel(user))

      // })
      // if (!this._repo.exists(id)) {
      //     reject(new NotFoundResult('UNKNOWN_CITY', 'There is no user with the specified ID!'));
      //     return;
      // }

      // if (!this._repo.hasAccess(id)) {
      //   reject(new ForbiddenResult('PERMISSION_REQUIRED', 'You have no permission to access the user with the specified ID!'));
      //   return;
      // }

      // const defaultCountry: string = this._env.DEFAULT_COUNTRY || 'Hungary';
      // const user: User = this._repo.getUser(id, defaultCountry);
      const result: CreateUserResult = {
        id
      };

      resolve(result);
    });
  }
  public deleteUser(id: string): Promise<DeleteUserResult> {
    return new Promise((resolve: (result: DeleteUserResult) => void, reject: (reason: NotFoundResult) => void): void => {
      
      const result: DeleteUserResult = {
        id
      };

      resolve(result);
    });
  }

}
