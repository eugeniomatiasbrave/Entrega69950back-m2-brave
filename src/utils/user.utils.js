import { faker } from "@faker-js/faker";
import bcrypt from 'bcrypt';
import config from "../config/config.js";

faker.locale = "es";
const PASSWORD = config.mocks.MOCKS;
const role = faker.helpers.arrayElement(["user", "admin"])

export const generateUser = async () => {
	const password = await bcrypt.hash( PASSWORD, 10);
	return {
	  firstName: faker.person.firstName(),
	  lastName: faker.person.lastName(),
	  email: faker.internet.email(),
	  birthDate: faker.date.past(),
	  password: password,
	  cartId: [], 
	  role: role
	};
  };
