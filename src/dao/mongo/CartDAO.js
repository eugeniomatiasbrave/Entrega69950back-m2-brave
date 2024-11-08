import cartModel from './models/cart.model.js';


export default class CartDAO {
	
	get( opts={}) { 
        return cartModel.find( opts ).lean(); // Busca todos
	}

    getBy(params) {
        if (typeof params === 'string') {
            params = { _id: params };
        }
        return cartModel.findOne(params).lean(); // Busca solo uno
    }

    create() {
        return cartModel.create({ products: [] });
    }

    // Método para agregar un producto al carrito seleccionado
    async addProductToCart( {cid, pid, quantity} ) {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            throw new Error('Cart not found');
        }
      
        const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
      if (productIndex > -1) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        cart.products[productIndex].quantity += quantity;
      } else {
        // Si el producto no está en el carrito, agrégalo
        cart.products.push({ product: pid, quantity });
      }

      await cart.save();
      return cart;
    }

    //Metodo elimina un product del carrito
    delete({ cid, pid }) {
        return cartModel.updateOne(
            { _id: cid },
            { $pull: { products: { product: pid } } }
        );
    }

    //metodo para vaciar el carrito con mongodb
    clean(clean) {
        return cartModel.updateOne(
            { _id: clean.cid },
            { $set: { products: [] } }
        );
      }


// Metodo para actualizar la cantidad del producto
updateQuantity({ cid, pid, quantity }) {
    return cartModel.updateOne(
        { _id: cid, "products.product": pid },
        { $set: { "products.$.quantity": quantity } }
    );
}

}
  