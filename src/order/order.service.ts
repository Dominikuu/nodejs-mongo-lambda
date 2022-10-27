import {Types} from 'mongoose'
import { ConfigurationErrorResult, NotFoundResult } from '../../shared/errors';
import {connectDB} from '../../database'
import OrderModel from '../../database/model/order'
import OrderItemModel from '../../database/model/orderItem'
import ProductModel from '../../database/model/product'
import { Order, OrderItem, CreateOrderResult, ListOrdersResult, GetOrderResult } from './order.interfaces';

export class OrderService {
  public constructor(private readonly _env: NodeJS.ProcessEnv) {
    connectDB()
  }

  public createOrder(order: Order): Promise<CreateOrderResult> {

    return new Promise(async(resolve: (result: CreateOrderResult) => void, reject: (reason: NotFoundResult) => void): Promise<void> => {
      try {

        const orderItems: OrderItem[] = order.orderItem
        const products = await ProductModel.find({
          '_id': {
            $in: order.orderItem.map((item)=> new Types.ObjectId(item.product_id))
          }
        })
        console.log(products)
        const productMap = {}
        for (const product of products) {
          productMap[product._id] = product.price
        }
        console.log(productMap)
        const total = orderItems.reduce((acc, item)=>productMap[item.product_id] * item.quantity +acc , 0)
        console.log(total)
        const {id: order_id} = await OrderModel.create(new OrderModel({...order, total}))
        console.log(orderItems)
        const orderItemsResult = await OrderItemModel.insertMany(orderItems.map((orderItem)=>({...orderItem, order_id})))
        console.log(orderItemsResult)
        const result: CreateOrderResult = {
          id: order_id
        };
        resolve(result);
      } catch(errors) {
        console.log(errors)
        reject(new ConfigurationErrorResult('CREATE_DENINED', 'You have no permission to access the city with the specified ID!'));
      }
    });
  }
  public listOrders(): Promise<ListOrdersResult> {

    return new Promise(async(resolve: (result: ListOrdersResult) => void, reject: (reason: NotFoundResult) => void): Promise<void> => {
      try {
        const orders = await OrderModel.find({})
        const result: ListOrdersResult = {
          orders
        };
        console.log(orders)
        resolve(result);
      } catch(errors) {
        reject(new ConfigurationErrorResult('CREATE_DENINED', 'You have no permission to access the city with the specified ID!'));
      }
    });
  }
  public getOrder(id: string): Promise<GetOrderResult> {

    return new Promise(async(resolve: (result: GetOrderResult) => void, reject: (reason: NotFoundResult) => void): Promise<void> => {
      try {
        const order = await OrderModel.aggregate([
          {$match: {_id: new Types.ObjectId(id)}},
          {
            "$lookup": {
                "from": "orderItem",
                "let": {"order_id": "$id"},
                "pipeline": [
                    {
                        "$match": {
                            "$expr": {"$eq": ["$$order_id", "$order_id"]},
                        },
                    }

                ],
                "as": "order_items"
            }
        },

        ])
        console.log(order)
        const result: GetOrderResult = {
          order
        };
        console.log(id)
        resolve(result);
      } catch(errors) {
        reject(new ConfigurationErrorResult('CREATE_DENINED', 'You have no permission to access the city with the specified ID!'));
      }
    });
  }
}
