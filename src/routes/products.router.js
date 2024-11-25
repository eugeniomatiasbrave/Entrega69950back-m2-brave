import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import viewsController from "../controllers/views.controller.js";
import { executePolicies } from '../middlewares/policies.js';
import uploader from '../services/uploader.js';
import validateCreateProduct  from '../middlewares/validators/productValidator.js';

const router = Router();

router.get('/',
	executePolicies(['PUBLIC']),
	productsController.getProducts);

router.get('/:pid',
	executePolicies(['PUBLIC']),
	productsController.getProductById);

router.post('/',
	executePolicies(['ADMIN']),
	uploader.array('thumbnail',3),
	validateCreateProduct,
	productsController.createProduct);

router.delete('/:pid',
	executePolicies(['ADMIN']),
	productsController.deleteProduct);

router.put('/:pid',
	executePolicies(['ADMIN']),
	productsController.updateProduct);

router.get('/detail/:pid',
	executePolicies(['PUBLIC','USER']),
	viewsController.renderProductDetail);

router.get('/unauthorized',
	executePolicies(['PUBLIC']),
	viewsController.renderUnauthorized);

export default router;