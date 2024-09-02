import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import { executePolicies } from '../middlewares/policies.js';

const router = Router();

router.get('/', executePolicies(['USER']), cartsController.getCarts);
router.get('/:cid', executePolicies(['USER']), cartsController.getCartById);
router.post('/', executePolicies(['USER']), cartsController.createCart);
router.post('/:cid/products/:pid', executePolicies(['USER']), cartsController.addProductToCart);
router.delete('/:cid', executePolicies(['USER']), cartsController.deleteAllProductsCid);
router.delete('/:cid/products/:pid', executePolicies(['USER']), cartsController.deleteProductCart);
router.put('/:cid', executePolicies(['USER']), cartsController.updateCart);
router.put('/:cid/products/:pid', executePolicies(['USER']), cartsController.updateProductQuantity);

export default router;