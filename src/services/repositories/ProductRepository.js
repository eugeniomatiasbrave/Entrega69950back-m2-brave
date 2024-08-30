
export default class ProductRepository {
	constructor(dao) {
		this.dao = dao;	
    };

	getProducts(params) {
         return this.dao.get(params);  
    };
    
    getProductsViews() {
        return this.dao.getViews();
    };
    
    getProductById(pid) { // Busca solo uno
        return this.dao.getBy(pid); 
    };
    
    createProduct(product){ // Crea uno nuevo
        return this.dao.create(product);
    };
    
    updateProduct(pid,updateData){ // edita uno
        return pthis.dao.update(pid,updateData);
    };
    
    deleteProduct(pid){ // elimina uno
        return this.dao.delete(pid);
    };	
};
