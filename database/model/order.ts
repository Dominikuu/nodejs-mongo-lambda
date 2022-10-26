import {Document, SchemaDefinition, SchemaTypes, Schema, model, models} from "mongoose";

export enum Payment {
  credit = 'credit',
  cash = 'cash',
}

export enum Delivery {
  freight='freight',
  air='air',
  boat='boat',
  motorbike='motorbike'
}

export interface IOrder extends Document {
  user_id: string;
  payment: Payment;
  timestamp: string;
  total: number;
  delivery: Delivery;
}

const schema: SchemaDefinition = {
  user_id: { type: SchemaTypes.ObjectId, required: true, unique: true },
  timestamp: { type: SchemaTypes.Date, default: Date.now},
  total: { type: SchemaTypes.Number, required: true },
  payment: { type: SchemaTypes.String, enum: Object.values(Payment) },
  delivery: { type: SchemaTypes.String, enum: Object.values(Delivery) },

};

const collectionName: string = "order";
const orderSchema: Schema = new Schema(schema);

const Order = models.order || model<IOrder>(collectionName, orderSchema);

export default Order;
