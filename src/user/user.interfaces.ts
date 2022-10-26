export interface User {
  country: string;
  id: string;
  name: string;
  populationDensity: number;
}

export interface GetUserResult {
  user: User;
}
