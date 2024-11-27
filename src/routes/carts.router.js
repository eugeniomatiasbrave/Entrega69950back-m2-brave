import BaseRouter from "./BaseRouter.js";
import cartsController from "../controllers/carts.controller.js";
import { executePolicies } from '../middlewares/policies.js';
import { passportCall } from '../middlewares/passportCall.js';

class CartsRouter extends BaseRouter {
    init() {
        this.get('/', ['USER'], executePolicies(['USER']), cartsController.getCarts);
        this.get('/:cid', ['USER'], executePolicies(['USER']), cartsController.getCartById);
        this.post('/', ['PUBLIC'], cartsController.createCart);
        this.post('/:cid/product/:pid', ['PUBLIC'], cartsController.addProductToCart);
        this.delete('/:cid/products/:pid', ['PUBLIC'], cartsController.deleteProductCart);
        this.put('/:cid/products', ['PUBLIC'], cartsController.cleanToCart);
        this.put('/:cid/products/:pid', ['PUBLIC'], cartsController.updateProductQuantity);
        this.post('/:cid/purchase', ['USER'], passportCall('current'), cartsController.purchaseCart);
    }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();