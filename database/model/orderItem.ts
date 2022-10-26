import {Document, SchemaDefinition, SchemaTypes, Schema, model} from "mongoose";

export interface IOrderItem extends Document {
  order_id: string;
  product_id: string;
  quantity: number;
}

const schema: SchemaDefinition = {
  order_id: { type: SchemaTypes.ObjectId, required: true },
  product_id: { type: SchemaTypes.ObjectId, required: true },
  quantity: { type: SchemaTypes.Number, required: true },
};

const collectionName: string = "orderItem";
const orderItemSchema: Schema = new Schema(schema);

const OrderItem = model<IOrderItem>(collectionName, orderItemSchema);

export default OrderItem;
