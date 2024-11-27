import BaseRouter from "./BaseRouter.js";
import productsController from "../controllers/products.controller.js";
import viewsController from "../controllers/views.controller.js";
import { executePolicies } from '../middlewares/policies.js';
import uploader from '../services/uploader.js';
import validateCreateProduct from '../middlewares/validators/productValidator.js';

class ProductsRouter extends BaseRouter {
    init() {
        this.get('/', ['PUBLIC'], executePolicies(['PUBLIC']), productsController.getProducts);
        this.get('/:pid', ['PUBLIC'], executePolicies(['PUBLIC']), productsController.getProductById);
        this.post('/', ['ADMIN'], executePolicies(['ADMIN']), uploader.array('thumbnail', 3), validateCreateProduct, productsController.createProduct);
        this.delete('/:pid', ['ADMIN'], executePolicies(['ADMIN']), productsController.deleteProduct);
        this.put('/:pid', ['ADMIN'], executePolicies(['ADMIN']), productsController.updateProduct);
        this.get('/detail/:pid', ['PUBLIC', 'USER'], executePolicies(['PUBLIC', 'USER']), viewsController.renderProductDetail);
        this.get('/unauthorized', ['PUBLIC'], executePolicies(['PUBLIC']), viewsController.renderUnauthorized);
    }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();