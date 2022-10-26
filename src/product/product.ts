import { ApiHandler } from '../../shared/api.interfaces';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

const repo: ProductRepository = new ProductRepository();
const service: ProductService = new ProductService(repo, process.env);
const controller: ProductController = new ProductController(service);

export const getProduct: ApiHandler = controller.getProduct;
export const createProduct: ApiHandler = controller.createProduct;
export const deleteProduct: ApiHandler = controller.deleteProduct;
