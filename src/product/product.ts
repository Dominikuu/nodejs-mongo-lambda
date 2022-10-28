import { ApiHandler } from '../../shared/api.interfaces';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

const service: ProductService = new ProductService();
const controller: ProductController = new ProductController(service);

export const createProduct: ApiHandler = controller.createProduct;
export const deleteProduct: ApiHandler = controller.deleteProduct;
