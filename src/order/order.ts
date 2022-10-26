import { ApiHandler } from '../../shared/api.interfaces';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

const repo: OrderRepository = new OrderRepository();
const service: OrderService = new OrderService(repo, process.env);
const controller: OrderController = new OrderController(service);

export const getOrder: ApiHandler = controller.getOrder;
export const createOrder: ApiHandler = controller.createOrder;

