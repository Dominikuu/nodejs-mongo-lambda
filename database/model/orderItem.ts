import { Document, SchemaDefinition, SchemaTypes, Schema, model, models } from 'mongoose';

export interface OrderItem extends Document {
  order_id: string;
  product_id: string;
  quantity: number;
}

const schema: SchemaDefinition = {
  order_id: { type: SchemaTypes.ObjectId, required: true , ref: 'orders'},
  product_id: { type: SchemaTypes.ObjectId, required: true, ref: 'products'},
  quantity: { type: SchemaTypes.Number, required: true },
};

const collectionName: string = 'orderItems';
const orderItemSchema: Schema = new Schema(schema);

export const OrderItem = models.orderItems || model<OrderItem>(collectionName, orderItemSchema);
