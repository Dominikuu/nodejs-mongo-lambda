import { ApiHandler } from '../../shared/api.interfaces';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

const repo: UserRepository = new UserRepository();
const service: UserService = new UserService(repo, process.env);
const controller: UserController = new UserController(service);

export const getUser: ApiHandler = controller.getUser;
export const deleteUser: ApiHandler = controller.deleteUser;
export const createUser: ApiHandler = controller.createUser;
