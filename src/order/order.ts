import { ApiHandler } from '../../shared/api.interfaces';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

const service: OrderService = new OrderService(process.env);
const controller: OrderController = new OrderController(service);

export const getOrder: ApiHandler = controller.getOrder;
export const createOrder: ApiHandler = controller.createOrder;
export const listOrders: ApiHandler = controller.listOrders;

