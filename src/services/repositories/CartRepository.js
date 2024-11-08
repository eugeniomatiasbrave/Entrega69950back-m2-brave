

export default class CartRepository {
	constructor(dao) {
		this.dao = dao;
	}

	getCarts( opts={}) { 
        return this.dao.get(opts); 
	}

    getCartById (cid) {
		return this.dao.getBy(cid); 
	};

    createCart() {
        return this.dao.create( {products:[]} );  
    }

    addProductToCart({ cid, pid, quantity }) {
        return this.dao.addProductToCart({ cid, pid, quantity });
    }

    deleteProductCart({ cid, pid }) {
        return this.dao.delete({ cid, pid });
    };

    // metodo para vaciar el carrito
    cleanToCart(cid) {
        return this.dao.clean(cid);
      }

    updateProductQuantity({ cid, pid, quantity }) {
        return this.dao.updateQuantity({ cid, pid, quantity });
    };


}