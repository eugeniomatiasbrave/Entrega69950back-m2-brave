import cartModel from './models/cart.model.js';

export default class CartDAO {
	
	get( opts={}) { 
        return cartModel.find( opts ).lean(); // Busca todos
	}

    getBy (cid) {
		return cartModel.findOne( {_id: cid}).lean(); // Busca solo uno
	};

    create() {
        const newCart = new cartModel({ products: [] });
        return newCart.save();
    }

    // Método para agregar un producto al carrito seleccionado
    add(cid, product) {
        return cartModel.findOneAndUpdate(
            { _id: String(cid), "products.product": product.product },
            { $inc: { "products.$.quantity": product.quantity } },
            { new: true }
        );
    };

    //Metodo elimina un product del carrito
    delete(cid, pid) {
        return cartModel.updateOne(
            { _id: String(cid) },
            { $pull: { products: { _id: pid } } }
        );
    };

    // Método deleteCard, no limina el carrito
    deleteAll(cid) {
        return cartModel.updateOne(
            { _id: String(cid) },
            { $set: { products: [] } }
        );
    };

// Metodo para actualizar todos los productos
    update(cid, products) {
        return cartModel.updateOne(
            { _id: String(cid) },
            { $set: { products: products } }
        );
    };

// Metodo para actualizar la cantidad del producto
    updateQuantity(cid, pid, quantity) {
        return cartModel.updateOne(
            { _id: String(cid), "products.product": pid },
            { $set: { "products.$.quantity": quantity } }
        );
    };
};


  