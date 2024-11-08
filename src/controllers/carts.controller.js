import { cartsService, productsService, ticketsService , usersService} from "../services/repositories.js";

const getCarts = async (req,res) => {  // probada ok
  try {
    const carts = await cartsService.getCarts();
    if (!carts) {
        return res.status(404).send({ status: "error", error: 'No se encontraron carritos'});
    }
    res.status(200).send({ status: "success", data: carts });
  } catch (error) {
    console.error('Error al leer los carritos:', error);
    res.status(500).send({ status: "error", error: 'Error al leer los carritos'});
 }
};

const getCartById = async (req,res) => {
  const cid = req.params.cid;
    if (!cid) {
       return res.status(400).send({ status: "error", error: 'cid es requerido' });
    }

    try {
      const cart = await cartsService.getCartById(cid);
      if (!cart) {
        return res.status(404).send({ status: "error", error: 'cid no encontrado' });
      }
      res.status(200).send({ status: "success", data: cart });
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      res.status(500).send({ status: "error", error: 'Error al obtener el carrito' });
    }
};

const createCart = async (req,res) => {
  try {
      const newCart = await cartsService.createCart();
      res.status(201).send({ status: "success", data: newCart });
  } catch (error) {
      console.error('Error creating cart:', error);
      res.status(500).send({ status: "error", error: 'Error al crear el carrito'});
  }
};

const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity  } = req.body;

  if ( quantity === "" || quantity === undefined || quantity === null) {
    quantity = 1;
  }

  try {
      const product = await productsService.getProductById(pid);
      if (!product) {
          return res.status(404).send({ status: "error", error: 'Producto no encontrado' });
      }

      const result = await cartsService.addProductToCart({cid,pid,quantity} );
      res.status(200).redirect('/carts');
  } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
      res.status(500).send({ status: "error", error: 'Error al agregar el producto al carrito' });
  }
};

const deleteProductCart = async (req,res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    console.log('cid',cid);
    console.log('pid',pid);

    const result = await cartsService.deleteProductCart({cid, pid});
    res.send({ message: 'Producto eliminado del carrito', data: result });
  } catch (error) {
    console.error('Error al eliminar el producto del carrito:', error);
    res.status(500).send({ message: 'Error al eliminar el producto del carrito' });
  }
};

const deleteAllProductsCid = async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await cartsService.deleteAllProductsCid(cid);
    if (result.nModified === 0) {
      return res.status(500).send({ status: "error", error: 'Error al eliminar todos los productos del carrito' });
    }
    res.send({ status: "success", message: 'Todos los productos eliminados del carrito' });
  } catch (error) {
    console.error('Error al eliminar todos los productos del carrito:', error);
    res.status(500).send({ status: "error", error: 'Error al eliminar todos los productos del carrito' });
  }
};

const updateCart = async (req,res) => {
  const cid = req.params.cid;
  const products = req.body.products; // Suponiendo que se envía un array de productos en el cuerpo de la solicitud
  const cart = await cartsService.getCartById(String(cid));
  if (cart === undefined) {
    return res.status(500).send({ status:"error", error: ' No se encontro el carrito' });
  }
  try {
      const updateResult = await cartsService.updateCart(cid, products);
      if (updateResult.nModified === 0) {
          return res.status(500).send({ status: "error", error: 'Error al actualizar los productos del carrito' });
      }
      res.send({ status: "success", message: 'Todos los productos actualizados en el carrito', data: products });
  } catch (error) {
      console.error('Error al actualizar los productos del carrito:', error);
      res.status(500).send({ status: "error", error: 'Error al actualizar los productos del carrito' });
  }
};

const updateProductQuantity = async (req, res) => {
  try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const result = await cartsService.updateProductQuantity({ cid, pid, quantity });
      if (result.nModified === 0) {
          return res.status(500).send({ status: "error", error: 'Error al actualizar la cantidad del producto en el carrito' });
      }
      res.send({ status: "success", message: 'Cantidad del producto actualizada en el carrito' });
    } catch (error) {
      console.error('Error al actualizar la cantidad del producto en el carrito:', error);
      res.status(500).send({ status: "error", error: 'Error al actualizar la cantidad del producto en el carrito' });
  }
};
/*
const purchaseCart = async (req, res) => {
    const { cid } = req.params;
    const user = usersService.getUserById(req.user._id);

    if (!user) {
      return res.status(404).send({ status: "error", error: 'Usuario no encontrado' });
    }
    const purchaserEmail = user.email;
    ///const purchaserEmail = req.user.email; // Obtener el correo del usuario autenticado por req.user
    console.log('Email de ticket', purchaserEmail);
  
    const cart = await cartsService.getCartById(cid);
  
    if (!cart) {
      return res.status(500).send({ status: "error", error: 'No se encontró el carrito' });
    }
  
    const productsInCart = cart.products;
    const productsToPurchase = []; // Productos que se pueden comprar
    const insufficientStockProducts = []; // Productos con stock insuficiente
  
    for (const item of productsInCart) {
      const product = await productsService.getProductById(item.product._id);
  
      // Verificar si hay suficiente stock para la cantidad solicitada
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await productsService.updateProduct(product._id, { stock: product.stock });
        productsToPurchase.push(item);
      } else {
        insufficientStockProducts.push(item);
      }
    }
  
    if (productsToPurchase.length === 0) {
      return res.status(400).send({ status: "error", error: 'No hay productos con stock suficiente para la compra de '+ insufficientStockProducts.length + ' productos' });
    }
           
    // Crear un ticket para la compra
    const ticket = {
      products: productsToPurchase,
      total: productsToPurchase.reduce((total, item) => total + item.product.price * item.quantity, 0),
      purchaser: purchaserEmail
    };

    const response = await ticketsService.createTicket({ticket});
 
    res.send({
      status: "success",
      message: 'Compra realizada con éxito',
      response,
      purchasedProducts: productsToPurchase,
      insufficientStockProducts
    });
}
    */
  

export default { 
	getCarts,
	getCartById,
	createCart,
	addProductToCart,
	deleteAllProductsCid,
	deleteProductCart,
	updateCart,
	updateProductQuantity,
 // purchaseCart
};


/* 
consigna ticket: 

Crear un modelo Ticket el cual contará con todas las formalizaciones de la compra. Éste contará con los campos
Id (autogenerado por mongo)
code: String debe autogenerarse y ser único
purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
amount: Number, total de la compra.
purchaser: String, contendrá el correo del usuario asociado al carrito.

Implementar, en el router de carts, la ruta /:cid/purchase, la cual permitirá finalizar el proceso de compra de 
dicho carrito.
La compra debe corroborar el stock del producto al momento de finalizarse
Si el producto tiene suficiente stock para la cantidad indicada en el producto del carrito, 
entonces restarlo del stock del producto y continuar.
Si el producto no tiene suficiente stock para la cantidad indicada en el producto del carrito, 
entonces no agregar el producto al proceso de compra. 

Al final, utilizar el servicio de Tickets para poder generar un ticket con los datos de la compra.
En caso de existir una compra no completada, devolver el arreglo con los ids de los productos que 
no pudieron procesarse.
Una vez finalizada la compra, el carrito asociado al usuario que compró deberá contener sólo los 
productos que no pudieron comprarse. Es decir, se filtran los que sí se compraron y se quedan aquellos 
que no tenían disponibilidad.


*/
