export interface Order {
  country: string;
  id: number;
  name: string;
  populationDensity: number;
}

export interface GetOrderResult {
  order: Order;
}
