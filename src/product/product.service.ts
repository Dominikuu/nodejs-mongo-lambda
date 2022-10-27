import { NotFoundResult, ConfigurationErrorResult } from '../../shared/errors';
import { Product, CreateProductResult, DeleteProductResult } from './product.interfaces';
import {connectDB} from '../../database'
import ProductModel from '../../database/model/product'
export class ProductService {
  public constructor(private readonly _env: NodeJS.ProcessEnv) {
    connectDB()
  }

  public createProduct(product: Product): Promise<CreateProductResult> {

    return new Promise(async(resolve: (result: CreateProductResult) => void, reject: (reason: NotFoundResult) => void): Promise<void> => {
      try {

        console.log(product)
        const {id} = await ProductModel.create(new ProductModel(product))
        const result: CreateProductResult = {
          id
        };
        console.log(id)
        resolve(result);
      } catch(errors) {
        console.log(errors)
        reject(new ConfigurationErrorResult('CREATE_DENINED', 'You have no permission to access the city with the specified ID!'));
      }
    });
  }
  public deleteProduct(id: string): Promise<DeleteProductResult> {
    return new Promise(async(resolve: (result: DeleteProductResult) => void, reject: (reason: NotFoundResult) => void): Promise<void> => {
      try {
        const res = await ProductModel.findOneAndDelete({id})
        console.log(res)
        const result: DeleteProductResult = {
          message: "DELETE USER " + id
        };

        resolve(result);
      } catch(errors) {
        console.log(typeof errors)
        reject(new ConfigurationErrorResult('DELETE_DENIED', errors as string));
      }
    });
  }

}
