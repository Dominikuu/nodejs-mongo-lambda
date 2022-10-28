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

export interface OrderResult {
  payment: Payment;
  delivery: Delivery;
  order_items: OrderItem[];
  user: {
    user_id: any;
    email: string;
    first_name: string;
    last_name: string;
};
}

export interface CreateOrderResult {
  id: string;
}

export interface GetOrderResult {
  order: OrderResult
}

export interface ListOrdersResult {
  orders: OrderResult[];
}

