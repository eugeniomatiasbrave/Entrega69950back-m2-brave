import ProductDAO from '../dao/mongo/ProductDAO.js';
import { expect } from 'chai';
import mongoose from 'mongoose';
import logger from '../../logs/app.logs.js';

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
        expect(Array.isArray(response)).to.be.equal(true);
        expect(response.length).to.be.equal(0);
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
        expect(product).to.have.property('_id');
		expect(response).to.have.lengthOf(1);
        expect(product).to.be.an('object');
        expect(product.title).to.be.equal(newProductTest.title);
        expect(product.description).to.be.equal(newProductTest.description);
        expect(product.code).to.be.equal(newProductTest.code);
        expect(product.price).to.be.equal(newProductTest.price);
        expect(product.category).to.be.equal(newProductTest.category);
        expect(product.stock).to.be.equal(newProductTest.stock);
        expect(product.status).to.be.equal(newProductTest.status);
        expect(product.slug).to.be.equal(newProductTest.slug);
        expect(product.thumbnails).to.be.an('array');
        expect(product.thumbnails).to.be.lengthOf(0);
    });

});