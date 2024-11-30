import { productsService } from "../services/repositories.js";
import { BadRequestError } from '../utils/custom.error.js';
import { makeid } from "../utils.js";
import logger from '../../logs/app.logs.js';

const getProducts = async (req,res) => {
    try {
      const products = await productsService.getProducts();
         logger.info("Productos obtenidos con éxito"); // uso de logger
      res.sendSuccess(products,"Productos obtenidos con éxito"); // error revisado
    } catch (error) {
         logger.error("Error al obtener los productos");
      res.sendServerError(error); // error revisado
    }
};

//resto meddlewere de errores no revisados
const getProductById = async (req,res) => {
    const pid = req.params.pid;

    try {
        const product = await productsService.getProductById(pid);
        if (!product) throw new BadRequestError('El producto que intentas obtener no existe');      
        res.sendSuccess(product, "Producto obtenido con éxito");
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.sendServerError(error );
    }
};

const createProduct = async (req,res) => {
    const { title, description, code, price, category, stock } = req.body;
    try {
        const newProduct = {
            title,
            description,
            price,
            code,
            stock,
            status: true,
            category,
            slug: `${title}_${makeid(4)}`,
            thumbnails: []
        };
        for (let i = 0; i < req.files.length; i++) {
            newProduct.thumbnails.push({ maintype: req.files[i].mimetype, path: `/files/products/${req.files[i].filename}`, main: i == 0 });
        }
        const result = await productsService.createProduct(newProduct);

        if (!result) throw new BadRequestError('Error al crear el producto');
        
        res.sendSuccess(result, "Producto creado con éxito"); // data: result es el producto creado.
    } catch (error) {
        console.log(error);
        res.sendServerError(error);
    }
};

const deleteProduct = async (req,res) => {
    const pid = req.params.pid;
    try {
        const product = await productsService.getProductById(pid);
        if (!product) {
            return res.sendBadRequest('El producto que intentas borrar no existe');
        }
        const deletedProduct = await productsService.deleteProduct(pid);
        if (!deletedProduct) {
            return res.sendServerError('Error al borrar el producto');
        }
        res.sendSuccess(deletedProduct, "Producto borrado con éxito");
    } catch (error) {
        console.error('Error al borrar el producto:', error);
        res.sendServerError('Hubo un problema al intentar borrar el producto');
    }
};

const updateProduct = async (req,res) => {
    try {
        const pid = req.params.pid;
        const updateData = req.body;
        // Validaciones en meddleware
        if (updateData.pid) { // Me aseguro que el id no se actualice en la DB
            delete updateData.pid;
        }
        const result = await productsService.updateProduct(pid, updateData);
        if (result === -1) {
            return res.sendServerError('Error al actualizar el producto');
        }
        const updatedProduct = await productsService.getProductById(pid);
        res.sendSuccess(updatedProduct, "Producto actualizado con éxito");
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.sendServerError('Error al actualizar el producto');
    }
};

export default { 
	getProducts,
	getProductById,
	createProduct,
	deleteProduct,
	updateProduct
};