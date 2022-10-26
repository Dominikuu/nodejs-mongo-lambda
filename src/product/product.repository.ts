import { Product } from './product.interfaces';

export class ProductRepository {

  public exists(id: number): boolean {
    return id > 0;
  }


  public getProduct(id: number, defaultCountry: string): Product {
    return {
      country: defaultCountry,
      id,
      name: 'Budapest',
      populationDensity: Math.random()
    };
  }


  public hasAccess(id: number): boolean {
    return id !== 666;   // tslint:disable-line no-magic-numbers (Demo number.)
  }
}
