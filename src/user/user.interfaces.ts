export interface User {
  country: string;
  id: number;
  name: string;
  populationDensity: number;
}

export interface GetUserResult {
  user: User;
}
