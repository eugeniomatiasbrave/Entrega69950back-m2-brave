import BaseRouter from "./BaseRouter.js";
import sessionsController from "../controllers/sessions.controller.js";
import viewsController from "../controllers/views.controller.js";
import { executePolicies } from '../middlewares/policies.js';

class ViewsRouter extends BaseRouter {
    init(){
        this.get('/', ['PUBLIC'],executePolicies(['USER']), viewsController.renderHome);
        this.get('/register', ['PUBLIC'], viewsController.renderRegister);
        this.get('/login', ['PUBLIC'], viewsController.renderLogin);
        this.get('/logout', ['USER', 'ADMIN'], executePolicies(['USER', 'ADMIN']), sessionsController.logout); // Ruta de logout
        this.get('/profile', ['USER', 'ADMIN'], executePolicies(['USER','ADMIN']), viewsController.renderProfile);
        this.get('/products', ['PUBLIC'], viewsController.renderProducts);
        this.get("/realtimeproducts", ['ADMIN'], executePolicies(['ADMIN']), viewsController.renderRealTimeProducts);
        this.get('/carts', ['USER'], executePolicies(['USER']), viewsController.renderCartById);
        this.get('/detail/:pid', ['PUBLIC'] , viewsController.renderProductDetail);
        this.get('/error', ['PUBLIC'], viewsController.error);
        this.get('/ticket', ['USER'], executePolicies(['USER']),  viewsController.renderTicket);
    }
}
const viewsRouter = new ViewsRouter();
export default viewsRouter.getRouter();