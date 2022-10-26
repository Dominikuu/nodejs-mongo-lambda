import { Order } from './order.interfaces';

export class OrderRepository {

  public exists(id: number): boolean {
    return id > 0;
  }


  public getOrder(id: number, defaultCountry: string): Order {
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
