import ManagersProducts from "./mongo/ManagersProducts.js";  // percistencia Mongo
import ManagersCarts from "./mongo/ManagersCarts.js";
import UserManager from "./mongo/UserManager.js";


export const productsService = new ManagersProducts();
export const cartsService = new ManagersCarts();
export const usersService = new UserManager();
