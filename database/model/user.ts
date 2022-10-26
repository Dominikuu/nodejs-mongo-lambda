// import mongoose from "mongoose";
import {Document, SchemaDefinition, SchemaTypes, Schema, Connection, Model} from "mongoose";

export enum Gender {
  male = 'male',
  female = 'female',
  undisclosed = 'undisclosed'
}

export interface Address extends Document {
  street: string;
  city: string;
  postCode: string;
}

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  gender?: Gender;
  address?: Address;
}

const schema: SchemaDefinition = {
  email: { type: SchemaTypes.String, required: true, unique: true },
  firstName: { type: SchemaTypes.String, required: true },
  lastName: { type: SchemaTypes.String, required: true },
  // Gets the Mongoose enum from the TypeScript enum
  gender: { type: SchemaTypes.String, enum: Object.values(Gender) },
  address: {
    street: { type: SchemaTypes.String },
    city: { type: SchemaTypes.String },
    postCode: { type: SchemaTypes.String }
  }
};

const collectionName: string = "user";
const userSchema: Schema = new Schema(schema);

const User = (conn: Connection): Model<IUser> =>
  conn.model<IUser>(collectionName, userSchema);

export default User;