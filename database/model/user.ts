import {Document, SchemaDefinition, SchemaTypes, Schema, model, models} from 'mongoose';

export enum Gender {
  male = 'male',
  female = 'female',
  undisclosed = 'undisclosed'
}

export interface Address extends Document {
  city: string;
  street: string;
  postCode: string;
}

export interface User extends Document {
  email: string;
  first_name: string;
  last_name: string;
  gender?: Gender;
  address?: Address;
}

const schema: SchemaDefinition = {
  email: { type: SchemaTypes.String, required: true, unique: true },
  first_name: { type: SchemaTypes.String, required: true },
  last_name: { type: SchemaTypes.String, required: true },
  // Gets the Mongoose enum from the TypeScript enum
  gender: { type: SchemaTypes.String, enum: Object.values(Gender) },
  address: {
    street: { type: SchemaTypes.String },
    city: { type: SchemaTypes.String },
    post_code: { type: SchemaTypes.String }
  }
};

const collectionName: string = 'user';
const userSchema: Schema = new Schema(schema);

export const User = models.user || model<User>(collectionName, userSchema);
