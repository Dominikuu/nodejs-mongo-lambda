import { ForbiddenResult, NotFoundResult } from '../../shared/errors';
import { Order, GetOrderResult } from './order.interfaces';
import { OrderRepository } from './order.repository';

export class OrderService {
  public constructor(private readonly _repo: OrderRepository, private readonly _env: NodeJS.ProcessEnv) {
  }

  public getOrder(id: number): Promise<GetOrderResult> {
    return new Promise((resolve: (result: GetOrderResult) => void, reject: (reason: NotFoundResult) => void): void => {
      if (!this._repo.exists(id)) {
          reject(new NotFoundResult('UNKNOWN_CITY', 'There is no order with the specified ID!'));
          return;
      }

      if (!this._repo.hasAccess(id)) {
        reject(new ForbiddenResult('PERMISSION_REQUIRED', 'You have no permission to access the order with the specified ID!'));
        return;
      }

      const defaultCountry: string = this._env.DEFAULT_COUNTRY || 'Hungary';
      const order: Order = this._repo.getOrder(id, defaultCountry);
      const result: GetOrderResult = {
        order
      };

      resolve(result);
    });
  }
}
