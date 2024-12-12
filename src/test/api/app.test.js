import { app, server } from "../../app.js";
import request from "supertest";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import logger from "../../../logs/app.logs.js";

const newMockProduct = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.number.int({ min: 101, max: 1000 }),
    price: faker.commerce.price(),
    category: faker.commerce.department(),
    stock: faker.number.int({ max: 90 }),
    status: faker.datatype.boolean(),
    slug: faker.lorem.slug(),
    thumbnails: []
  };
};

describe("/api/products", () => {
  let token;

  beforeAll(async () => {
    try {
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.TEST_DB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      }
      await mongoose.connection.collections["products"].drop();

      // Autenticar y obtener un token
      const response = await request(app)
        .post('/api/sessions/login')
        .send({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });

        logger.info( 'env---:',{ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });

      if (response.status !== 200) {
        throw new Error('Failed to authenticate');
      }

      token = response.body.token;
      if (!token) {
        throw new Error('Token is undefined');
      }
    } catch (error) {
      console.error('Error in beforeAll:', error);
      throw error;
    }
  });

  beforeEach(async () => {
    try {
      await mongoose.connection.collections['products'].deleteMany({});
    } catch (error) {
      console.error('Error in beforeEach:', error);
      throw error;
    }
  });

  afterAll(async () => {
    try {
      await mongoose.disconnect();
      server.close();
    } catch (error) {
      console.error('Error in afterAll:', error);
      throw error;
    }
  });

  test("[POST]", async () => {
    const fakeProduct = newMockProduct();
    logger.info(fakeProduct);
    const response = await request(app)
      .post("/api/products")
      .set('Authorization', `Bearer ${token}`)
      .send(fakeProduct);

    expect(response.body).toBeDefined();
    logger.info(response.body);
  });

  test("[GET]", async () => {
    const response = await request(app).get("/api/products");
    logger.info(response.body);
  });
});