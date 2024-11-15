import { productsService } from "../services/repositories.js";
import { makeid } from "../utils.js";

const getProducts = async (req,res) => {
    try {
        const products = await productsService.getProducts();
        res.sendSuccess(products);
    } catch (error) {
        res.sendBadRequest('ERROR_GET_PRODUCTS');
    }
};

const getProductById = async (req,res) => {
    try {
        const pid = req.params.pid;
        const product = await productsService.getProductById(pid);
        if (!product) {
            return res.status(400).send({ status: "error", error: 'No se encontró el producto con el ID: ' + pid });
        }
        res.send({ status: "success", data: product });
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).send({ status: "error", error: 'Error al obtener el producto' });
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
        if (!result) {
            return res.sendBadRequest('ERROR_CREATE_PRODUCT');
        }
        res.sendSuccess(result); // data: result es el producto creado.
    } catch (error) {
        console.log(error);
        res.sendBadRequest('ERROR_CREATE_PRODUCT');
    }
};

const deleteProduct = async (req,res) => {
    const pid = req.params.pid;
    try {
        const product = await productsService.getProductById(pid);
        if (!product) {
            return res.status(404).send({ status: "error", error: 'El producto que intentas borrar no existe' });
        }
        const deletedProduct = await productsService.deleteProduct(pid);
        if (!deletedProduct) {
            return res.status(500).send({ status: "error", error: 'Error al borrar el producto' });
        }
        res.send({ status: "success", data: deletedProduct });
    } catch (error) {
        console.error('Error al borrar el producto:', error);
        res.status(500).send({ status: "error", error: 'Hubo un problema al intentar borrar el producto' });
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
            return res.status(500).send({ status: "error", error: 'Error al actualizar el producto' });
        }
        const updatedProduct = await productsService.getProductById(pid);
        res.send({ status: "success", message: `Producto actualizado id: ${pid}`, data: updatedProduct });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).send({ status: "error", error: 'Error al actualizar el producto' });
    }
};

export default { 
	getProducts,
	getProductById,
	createProduct,
	deleteProduct,
	updateProduct
};