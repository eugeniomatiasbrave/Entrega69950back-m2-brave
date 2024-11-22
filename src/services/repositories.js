import CartRepository from "./repositories/CartRepository.js";
import ProductRepository from "./repositories/ProductRepository.js";
import UserRepository from "./repositories/UserRepository.js";
import TicketRepository from "./repositories/TicketRepository.js";

import CartDAO from "../dao/mongo/CartDAO.js";
import ProductDAO from "../dao/mongo/ProductDAO.js";  // percistencia Mongo
import UserDAO from "../dao/mongo/UserDAO.js";
import TicketDAO from "../dao/mongo/TicketDAO.js";

export const productsService = new ProductRepository(new ProductDAO());
export const cartsService = new CartRepository(new CartDAO());
export const usersService = new UserRepository(new UserDAO());
export const ticketsService = new TicketRepository(new TicketDAO());
