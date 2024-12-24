import mongoose from 'mongoose';
import ProductDAO from '../../dao/mongo/ProductDAO.js';
import assert from 'node:assert';
import logger from '../../../logs/app.logs.js';

describe('Tests unitarios de ProductDAO', () => {
    let productDAO;

	before(async () => {
        // Conectar a la base de datos de prueba
        await mongoose.connect('mongodb://localhost:27017/productsTest');
        // Inicializar el DAO de productos
        productDAO = new ProductDAO();
    });

    beforeEach(async () => {
        // Limpiar la colección de productos antes de cada test
        await mongoose.connection.collections['products'].deleteMany({});
        logger.info('Se limpió la colección de productos');
    });

    after(async () => {
        // Desconectar de la base de datos de prueba
        await mongoose.disconnect();
    });

    it('Debería retornar todos los Products de la colección', async () => {
        const response = await productDAO.getViews();
        assert.equal(Array.isArray(response), true);
        //assert.equal(response.length).to.be.equal(0);
        assert.equal(response.length, 0);
    });

    it('Debería crear un product', async () => {
        const newProductTest = {
            title: "Producto de prueba",
            description: "Descripción de prueba",
            code: "123",
            price: 100,
            category: "test",
            stock: 10,
            status: true,
            slug: "producto_de_prueba",
            thumbnails: []
        };
        const product = await productDAO.create(newProductTest);
		const response = await productDAO.getViews();
        assert.ok(product._id);
        // assert.fail(response.asdasd)
		assert.equal(response.length, 1);
        assert.equal(typeof product, 'object');
        assert.equal(product.title, newProductTest.title);
        assert.equal(product.description, newProductTest.description);
        assert.equal(product.code, newProductTest.code);
        assert.equal(product.price, newProductTest.price);
        assert.equal(product.category, newProductTest.category);
        assert.equal(product.stock, newProductTest.stock);
        assert.equal(product.status, newProductTest.status);
        assert.equal(product.slug, newProductTest.slug);
        assert.equal(typeof product.thumbnails, 'object');
        assert.equal(product.thumbnails.length, 0);  
    });
});