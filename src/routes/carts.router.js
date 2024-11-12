import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import { executePolicies } from '../middlewares/policies.js';
import { passportCall } from '../middlewares/passportCall.js';//con current traigo el usuario logueado


const router = Router();

router.get('/', executePolicies(['USER']), cartsController.getCarts); // probada ok
router.get('/:cid', executePolicies(['USER']), cartsController.getCartById); // muestro el carrito del usuario
router.post('/', executePolicies(['USER']), cartsController.createCart);
router.post('/:cid/product/:pid', cartsController.addProductToCart); 
router.delete('/:cid/products/:pid', cartsController.deleteProductCart);
router.put('/:cid/products', cartsController.cleanToCart)
router.put('/:cid/products/:pid', cartsController.updateProductQuantity);
router.post('/:cid/purchase', passportCall('current'),cartsController.purchaseCart); // permite finalizar el proceso de compra de dicho carrito.


export default router;