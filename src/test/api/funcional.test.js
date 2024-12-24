import request from 'supertest';
import { faker } from "@faker-js/faker";
import { app, server } from '../../app.js';
import mongoose from 'mongoose';
import { expect } from 'chai';

describe('Functional Tests for Authentication', function() {

  after(async () => {
    await mongoose.disconnect();
    server.close();
  });

  it('Should register a new user', async () => {

    const newUser = () => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      birthDate: faker.date.past(),
      password: faker.internet.password(),
      cartId: [], 
      role: role
    }
  };

    const response = await request(app)
      .post('/api/sessions/register')
      .send(newUser);

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Registered');
  });

  it('Should login a user', async () => {
    const userCredentials = {
      email: 'testuser@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/sessions/login')
      .send(userCredentials);

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Logged in successfully');
    expect(response.body).to.have.property('token');
  });
});