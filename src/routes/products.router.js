import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import viewsController from "../controllers/views.controller.js";
import { executePolicies } from '../middlewares/policies.js';
import uploader from '../services/uploader.js';


const router = Router();

router.get('/', executePolicies(['PUBLIC']),productsController.getProducts);
router.get('/:pid', executePolicies(['PUBLIC']), productsController.getProductById);
router.post('/', uploader.array('thumbnail', 3), productsController.createProduct ); // ver si funciona
router.delete('/:pid', productsController.deleteProduct);
router.put('/:pid', executePolicies(['ADMIN']), productsController.updateProduct);
router.get('/detail/:pid', executePolicies(['PUBLIC', 'USER']), viewsController.renderProductDetail);

export default router;