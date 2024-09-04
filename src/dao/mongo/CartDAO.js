import cartModel from './models/cart.model.js';

export default class CartDAO {
	
	get( opts={}) { 
        return cartModel.find( opts ).lean(); // Busca todos
	}

    getBy (cid) {
		return cartModel.findOne( {_id: cid}).lean(); // Busca solo uno
	};

    create() {
        return cartModel.create({ products: [] });
    }

    // Método para agregar un producto al carrito seleccionado
    async addProductToCart({ cid, pid, quantity = 1 }) {
        const cart = await cartModel.findOne({ _id: cid }).populate('products.product');
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        const productIndex = cart.products.findIndex(p => p.product._id.toString() === pid);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity });
        }

        await cart.save();
        return cartModel.findOne({ _id: cid }).populate('products.product').lean(); // Retorna el carrito actualizado y populado
    }


    //Metodo elimina un product del carrito
    delete({ cid, pid }) {
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
    update({ cid, products }) {
        return cartModel.updateOne(
            { _id: String(cid) },
            { $set: { products: products } }
        );
    };

// Metodo para actualizar la cantidad del producto
    updateQuantity({cid, pid, quantity}) {
        return cartModel.updateOne(
            { _id: String(cid), "products.product": pid },
            { $set: { "products.$.quantity": quantity } }
        );
    };
};


  