import productModel from './models/product.model.js';

export default class ProductDAO {

    buildFilter({ maxPrice, category, stock }) {
        const filter = {};
        if (maxPrice) filter.price = { $lte: maxPrice };
        if (category) filter.category = category;
        if (stock) filter.stock = { $gte: stock };
        return filter;
    }
   
    get (page, limit, sort, maxPrice, category, stock) {
        const filter = this.buildFilter({ maxPrice, category, stock });
        const options = { limit, page, lean: true };
        if (sort === 'asc' || sort === 'desc') {
            options.sort = { price: sort };
        }
        return productModel.paginate(filter, options);
    }
   
    getViews () {
        return productModel.find({}).lean();
    };
    
    getBy(id) {
        return this.model.findById(id); 
    }
    
    create (product){ // Crea uno nuevo
        return productModel.create(product);
    };
    
    update (pid, updateData){ // edita uno
        return productModel.updateOne({ _id: String(pid) }, { $set: updateData });
    };
    
    delete (pid){ // elimina uno
        return productModel.deleteOne({_id: pid});
    };	
    
};

