import {Delivery, Payment} from '../../database/model/order'

export interface OrderItem {
  product_id: string;
  quantity: number;
}
export interface Order {
  user_id: string;
  payment: Payment;
  delivery: Delivery;
  orderItem: OrderItem[];
}

export interface CreateOrderResult {
  id: string;
}

export interface GetOrderResult {
  order: Order;
}

export interface ListOrdersResult {
  orders: Order[];
}

