import BaseRouter from "./BaseRouter.js";
import viewsController from "../controllers/views.controller.js";

class ViewsRouter extends BaseRouter {
    init(){
        this.get('/', ['PUBLIC'], viewsController.renderHome)
        this.get('/register', ['PUBLIC'], viewsController.renderRegister)
        this.get('/login', ['PUBLIC'], viewsController.renderLogin)
        this.get('/profile', ['USER'], viewsController.renderProfile);
        this.get('/products', ['PUBLIC'], viewsController.renderProducts);
        this.get("/realtimeproducts", ['PUBLIC'], viewsController.renderRealTimeProducts);
    }
}

const viewsRouter = new ViewsRouter();
export default viewsRouter.getRouter();