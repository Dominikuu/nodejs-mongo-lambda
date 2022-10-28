import { ApiHandler } from '../../shared/api.interfaces';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const service: UserService = new UserService();
const controller: UserController = new UserController(service);
export const deleteUser: ApiHandler = controller.deleteUser;
export const createUser: ApiHandler = controller.createUser;
