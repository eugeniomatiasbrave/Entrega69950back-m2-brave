
export default class ProductRepository {
	constructor(dao) {
		this.dao = dao;	
    };

	async getProducts(page, limit, sort, maxPrice, category, stock) {
         return await this.dao.get(page, limit, sort, maxPrice, category, stock);  
    };
    
    async getProductsViews() {
        return await this.dao.getViews();
    };
    
    async getProductById(pid) { // Busca solo uno
        return await this.dao.getBy(pid); 
    };
    
    async createProduct(product){ // Crea uno nuevo
        return await this.dao.create(product);
    };
    
    async updateProduct(pid,updateData){ // edita uno
        return await this.dao.update(pid,updateData);
    };
    
    async deleteProduct(pid){ // elimina uno
        return await this.dao.delete(pid);
    };	
};
