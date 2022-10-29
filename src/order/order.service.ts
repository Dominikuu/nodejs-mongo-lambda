import { Types } from 'mongoose'
import { ConfigurationErrorResult, NotFoundResult } from '../../shared/errors';
import { connectDB } from '../../database'
import { Order as OrderModel} from '../../database/model/order'
import { OrderItem as OrderItemModel} from '../../database/model/orderItem'
import { Product as ProductModel} from '../../database/model/product';
import { User as UserModel} from '../../database/model/user'
import { Order, OrderItem, OrderItemResult, CreateOrderResult, ListOrdersResult, GetOrderResult, OrderResult } from './order.interfaces';

export class OrderService {
  public constructor() {
    connectDB();
  }

  public createOrder(order: Order): Promise<CreateOrderResult> {
    return new Promise(async (resolve: (result: CreateOrderResult) => void, reject: (reason: NotFoundResult) => void): Promise<void> => {
      try {
        // Check user if existed
        const user = await UserModel.findById(order.user_id).exec()
        if (!user) {
          reject(new NotFoundResult('CREATE_DENIED', "Target user isn't existed"));  
        }
        // Check user if existed
        const orderItems: OrderItem[] = order.orderItem;
        const products = await ProductModel.find({
          _id: {
            $in: order.orderItem.map((item) => new Types.ObjectId(item.product_id))
          }
        }).exec();
        if (orderItems.length !== products.length) {
          reject(new NotFoundResult('CREATE_DENIED', "Target product isn't existed"));  
        }
        const productMap = {};
        for (const product of products) {
          productMap[product._id] = product.price;
        };
        const total = orderItems.reduce((acc, item)=>productMap[item.product_id] * item.quantity +acc , 0);
        const {id: order_id} = await OrderModel.create(new OrderModel({...order, total}));
        await OrderItemModel.insertMany(orderItems.map((orderItem)=>({...orderItem, order_id})));
        const result: CreateOrderResult = {
          id: order_id
        };
        resolve(result);
      } catch (errors) {
        reject(new ConfigurationErrorResult('CREATE_DENINED', 'You have no permission to access the city with the specified ID!'));
      }
    });
  }
  public listOrders(): Promise<ListOrdersResult> {
    return new Promise(async (resolve: (result: ListOrdersResult) => void, reject: (reason: NotFoundResult) => void): Promise<void> => {
      try {
        const orders = await this.fetchOrder()
        const result: ListOrdersResult = {
          orders
        };
        resolve(result);
      } catch (errors) {
        reject(new ConfigurationErrorResult('LIST_DENINED', 'You have no permission to access the city with the specified ID!'));
      }
    });
  }
  public getOrder(id: string): Promise<GetOrderResult> {
    return new Promise(async (resolve: (result: GetOrderResult) => void, reject: (reason: NotFoundResult) => void): Promise<void> => {
      try {
        const orders = await this.fetchOrder(id)
        const result: GetOrderResult = {
          order: orders[0]
        };
        resolve(result);
      } catch (errors) {
        reject(new ConfigurationErrorResult('GET_DENINED', 'You have no permission to access the city with the specified ID!'));
      }
    });
  }

  private async fetchOrder(id?: string): Promise<OrderResult[]> {
    const pipeline = [
      {
        $lookup: {
            from: 'orderitems',
            let: {order_id: '$_id'},
            pipeline: [
              {
                $match: {
                    $expr: {$eq: ['$$order_id', '$order_id']},
                },
              },
              {
                $project:
                {
                  quantity: 1, product_id: 1
                }
              }
            ],
            as: 'order_items'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user'
      }},
      { $unwind: '$user' },
      { $addFields: {user: '$user'}},
    ];
    try {
      const orders = await OrderModel.aggregate(id? [{$match: {_id: new Types.ObjectId(id)}}, ...pipeline]: pipeline).exec();
      // Qurey product info by orderItem.product_id
      const orderItemIds = new Set();
      const orderItems = orders.reduce((acc, cur) => acc.concat(cur.order_items), []);
      
      for(const orderItem of orderItems) {
        orderItemIds.add(orderItem.product_id.toString());
      }
      const product_list = await ProductModel.find({'_id': {$in: Array.from(orderItemIds)}}).exec();
      const productDict = product_list.reduce((acc, {_id, price, name, category}) => {
        acc[_id] = { price, name, category };
        return acc;
      }, {});
      // Restructure result object
      const result = orders.map(({_id, order_items, total, user, payment, timestamp, delivery}) => {
        const _order_items: OrderItemResult[] = order_items.map(({product_id, quantity}: OrderItem) => {
          const {name, description, price, category} = productDict[product_id];
          return {quantity, name, description, price, product_id, category}
        });
        return { order_id: _id.toString(), total,payment, timestamp, delivery, order_items: _order_items, user: {user_id: user._id.toString(), email: user.email, first_name: user.first_name, last_name: user.last_name }};
      });
      return result;
    } catch(errors) {
      return []
    }
  }
}
