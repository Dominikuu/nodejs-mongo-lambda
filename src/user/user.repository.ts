import { User } from './user.interfaces';

export class UserRepository {

  public exists(id: string): boolean {
    return id? true: false;
  }


  public getUser(id: string, defaultCountry: string): User {
    return {
      country: defaultCountry,
      id,
      name: 'Budapest',
      populationDensity: Math.random()
    };
  }

  public hasAccess(id: string): boolean {
    return id === '666';   // tslint:disable-line no-magic-numbers (Demo number.)
  }
}
