export interface Product {
  category: string;
  name: string;
  description: string;
  price: number;
}
export interface GetProductResult {
  product: Product;
}
export interface CreateProductResult {
  id: string;
}
export interface DeleteProductResult {
  message: string;
}
