import productModel from './models/product.model.js';

export default class ProductDAO {

    buildFilter({ maxPrice, category, stock }) {
        const filter = {};
        if (maxPrice) filter.price = { $lte: maxPrice };
        if (category) filter.category = category;
        if (stock) filter.stock = { $gte: stock };
        return filter;
    }
   
   async get (page, limit, sort, maxPrice, category, stock) {
        const filter = this.buildFilter({ maxPrice, category, stock });
        const options = { limit, page, lean: true };
        if (sort === 'asc' || sort === 'desc') {
            options.sort = { price: sort };
        }
        return await productModel.paginate(filter, options);
    }
   
    async getViews () {
        return await productModel.find({}).lean();
    };
    
    async getBy(id) {
        return await productModel.findById(id); 
    }
    
    async create (product){ // Crea uno nuevo
        return await productModel.create(product);
    };
    
    async update (pid, updateData){ // edita uno
        return await productModel.updateOne({ _id: String(pid) }, { $set: updateData });
    };
    
    async delete (pid){ // elimina uno
        return await productModel.deleteOne({_id: pid});
    };	
};

