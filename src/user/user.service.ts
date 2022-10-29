import { NotFoundResult, ConfigurationErrorResult } from '../../shared/errors';
import { User, CreateUserResult, DeleteUserResult } from './user.interfaces';
import { connectDB } from '../../database'
import {User as UserModel} from '../../database/model/user'
export class UserService {
  public constructor() {
    connectDB()
  }

  public createUser(user: User): Promise<CreateUserResult> {

    return new Promise(async(resolve: (result: CreateUserResult) => void, reject: (reason: NotFoundResult) => void): Promise<void> => {
      try {
        const {id} = await UserModel.create(new UserModel(user));
        const result: CreateUserResult = {
          id
        };
        resolve(result);
      } catch (errors) {
        reject(new ConfigurationErrorResult('CREATE_DENINED', 'You have no permission to access the user with the specified ID!'));
      }
    });
  }
  public deleteUser(id: string): Promise<DeleteUserResult> {
    return new Promise(async(resolve: (result: DeleteUserResult) => void, reject: (reason: NotFoundResult) => void): Promise<void> => {
      try {
        const target = await UserModel.findById(id).exec()
        if (!target) {
          reject(new NotFoundResult('DELETE_DENIED', "Target user isn't existed"));  
        }
        await UserModel.deleteOne({id}).exec()
        const result: DeleteUserResult = {
          message: 'DELETE USER ' + id
        };
        resolve(result);
      } catch (errors) {
        reject(new ConfigurationErrorResult('DELETE_DENIED', errors as string));
      }
    });
  }

}
