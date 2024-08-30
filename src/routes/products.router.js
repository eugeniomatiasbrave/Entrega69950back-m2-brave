import { Router } from "express";
import productsController from "../controllers/products.controller.js";
//import { makeid } from "../utils.js";
import uploader from '../services/uploader.js';

const router = Router();

router.get('/', productsController.getProducts);
router.get('/:pid', productsController.getProductById);
router.post('/', uploader.array('thumbnail', 3),productsController.createProduct); // ver si funciona
router.delete('/:pid', productsController.deleteProduct);
router.put('/:pid', productsController.updateProduct);

export default router;