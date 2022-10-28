import { Document, SchemaDefinition, SchemaTypes, Schema, model, models } from 'mongoose';

export interface Product extends Document {
  category: string;
  name: string;
  description: string;
  price: number;
}

const schema: SchemaDefinition = {
  category: { type: SchemaTypes.String, required: true },
  name: { type: SchemaTypes.String, required: true },
  description: { type: SchemaTypes.String, required: true },
  price: { type: SchemaTypes.Number, required: true },

};

const collectionName: string = 'product';
const productSchema: Schema = new Schema(schema);

export const Product = models.product || model<Product>(collectionName, productSchema);
