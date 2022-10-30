import { BadRequestResult, ConfigurationErrorResult, NotFoundResult} from '../../shared/errors';
import { connectDB } from '../../database'
import { CreateProductResult, DeleteProductResult, Product} from './product.interfaces';
import {Product as ProductModel} from '../../database/model/product'
export class ProductService {
  public constructor() {
    connectDB()
  }

  public createProduct(product: Product): Promise<CreateProductResult> {
    return new Promise(async(resolve: (result: CreateProductResult) => void, reject: (reason: NotFoundResult) => void): Promise<void> => {
      try {
        const target = await ProductModel.findOne({name: product.name}).exec()
        if (target) {
          reject(new BadRequestResult('CREATE_DENIED', "Product name duplicated"));  
          return
        }
        const {id} = await ProductModel.create(new ProductModel(product))
        const result: CreateProductResult = {
          id
        };
        resolve(result);
      } catch (errors) {
        reject(new ConfigurationErrorResult('CREATE_DENINED', 'You have no permission to access the city with the specified ID!'));
      }
    });
  }
  public deleteProduct(id: string): Promise<DeleteProductResult> {
    return new Promise(async(resolve: (result: DeleteProductResult) => void, reject: (reason: NotFoundResult) => void): Promise<void> => {
      try {
        const target = await ProductModel.findById(id).exec()
        if (!target) {
          reject(new BadRequestResult('DELETE_DENIED', "Target product isn't existed"));  
          return
        }
        await ProductModel.deleteOne({id}).exec()
        const result: DeleteProductResult = {
          message: 'DELETE PRODUCT ' + id
        };
        resolve(result);
      } catch (errors) {
        reject(new ConfigurationErrorResult('DELETE_DENIED', errors as string));
      }
    });
  }

}
