export default class CartRepository {
	constructor(dao) {
		this.dao = dao;
	}

	getCarts( opts={}) { 
        return this.dao.get( opts ); 
	}

    getCartById (cid) {
		return this.dao.getBy( cid ); 
	};

    createCart() {
        const newCart = new cartModel({ products: [] });
        return newCart.save();
    }

    addProductToCart(cid, product) {
        return this.dao.add(cid, product);
    };

    deleteProductCart(cid, pid) {
        return this.dao.delete(cid, pid);
    };

    deleteAllProductsCid(cid) {
        return this.dao.deleteAll(cid);
    };

    updateCart(cid, products) {
        return this.dao.update(cid, products);
    };

    updateProductQuantity(cid, pid, quantity) {
        return this.dao.updateQuantity(cid, pid, quantity);
    };

}