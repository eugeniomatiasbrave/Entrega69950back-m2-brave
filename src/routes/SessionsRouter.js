import { passportCall } from "../middlewares/passportCall.js";
import BaseRouter from "./BaseRouter.js";
import sessionsController from "../controllers/sessions.controller.js";
import { executePolicies } from '../middlewares/policies.js';

class SessionsRouter extends BaseRouter {
    init() {
        this.post('/register',['PUBLIC'], passportCall('register'), sessionsController.register);
        this.post('/login',['PUBLIC'], passportCall('login'), sessionsController.login);
        this.get('/current', ['USER'], passportCall('current'), executePolicies(['USER']), sessionsController.current);
        this.get('/logout', ['USER', 'ADMIN'], executePolicies(['USER', 'ADMIN']), sessionsController.logout);
    }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();