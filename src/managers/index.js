import ManagersProducts from "./mongo/ManagersProducts.js";  // percistencia Mongo
import ManagersCarts from "./mongo/ManagersCarts.js";


export const productsService = new ManagersProducts();
export const cartsService = new ManagersCarts();
