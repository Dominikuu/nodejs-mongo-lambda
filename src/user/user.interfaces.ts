export interface Address {
  street: string;
  city: string;
  postCode: string;
}

export interface User {
  email: string;
  first_name: string;
  last_name: string;
  gender?: Gender;
  address?: Address;
}

export enum Gender {
  male = 'male',
  female = 'female',
  undisclosed = 'undisclosed'
}

export interface GetUserResult {
  user: User;
}
export interface CreateUserResult {
  id: string;
}
export interface DeleteUserResult {
  message: string;
}
