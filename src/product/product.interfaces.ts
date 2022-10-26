export interface Product {
  country: string;
  id: number;
  name: string;
  populationDensity: number;
}

export interface GetProductResult {
  product: Product;
}
