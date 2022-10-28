export interface Address {
  city: string;
  street: string;
  postCode: string;
}

export interface User {
  address?: Address;
  email: string;
  first_name: string;
  gender?: Gender;
  last_name: string;
}

export enum Gender {
  female = 'female',
  male = 'male',
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
