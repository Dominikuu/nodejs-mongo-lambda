import { ForbiddenResult, NotFoundResult } from '../../shared/errors';
import { Product, GetProductResult } from './product.interfaces';
import { ProductRepository } from './product.repository';

export class ProductService {
  public constructor(private readonly _repo: ProductRepository, private readonly _env: NodeJS.ProcessEnv) {
  }

  public getProduct(id: number): Promise<GetProductResult> {
    return new Promise((resolve: (result: GetProductResult) => void, reject: (reason: NotFoundResult) => void): void => {
      if (!this._repo.exists(id)) {
          reject(new NotFoundResult('UNKNOWN_CITY', 'There is no product with the specified ID!'));
          return;
      }

      if (!this._repo.hasAccess(id)) {
        reject(new ForbiddenResult('PERMISSION_REQUIRED', 'You have no permission to access the product with the specified ID!'));
        return;
      }

      const defaultCountry: string = this._env.DEFAULT_COUNTRY || 'Hungary';
      const product: Product = this._repo.getProduct(id, defaultCountry);
      const result: GetProductResult = {
        product
      };

      resolve(result);
    });
  }
}
