import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";

const router = Router();

router.get('/', cartsController.getCarts);
router.get('/:cid', cartsController.getCartById);
router.post('/', cartsController.createCart);
router.post('/:cid/products/:pid', cartsController.addProductToCart);
router.delete('/:cid', cartsController.deleteAllProductsCid);
router.delete('/:cid/products/:pid', cartsController.deleteProductCart);
router.put('/:cid', cartsController.updateCart);
router.put('/:cid/products/:pid', cartsController.updateProductQuantity);

export default router;