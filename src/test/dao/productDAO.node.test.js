import ProductDAO from '../../dao/mongo/ProductDAO.js';
import { faker } from "@faker-js/faker";
import test, { before, after, describe, beforeEach } from "node:test";
import assert from 'node:assert';
import mongoose from 'mongoose';
import logger from '../../../logs/app.logs.js';

const newMockProduct = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.number.int({ min:101, max: 1000 }), // 42
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        stock: faker.number.int({ max: 90 }),
        status: faker.datatype.boolean(),
        slug: faker.lorem.slug(),
        thumbnails: []
    };
}

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
    });

    after(async () => {
        // Desconectar de la base de datos de prueba
        await mongoose.disconnect();
    });

    test('Debería retornar todos los Products de la colección', async () => {
        const response = await productDAO.getViews();
        assert.equal(Array.isArray(response), true);
        //assert.equal(response.length).to.be.equal(0);
        assert.equal(response.length, 0);
    });

    test('Debería crear un product', async () => {
        const newProductTest = newMockProduct();
        logger.info(newProductTest);

        const product = await productDAO.create(newProductTest);
		const response = await productDAO.getViews();
        
        assert.ok(product._id);
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