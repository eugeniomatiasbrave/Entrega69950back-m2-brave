import BaseRouter from "./BaseRouter.js";
import usersController from "../controllers/users.controller.js";
//import { passportCall } from "../middlewares/passportCall.js";
//import { executePolicies } from '../middlewares/policies.js';

class UsersRouter extends BaseRouter {
    init() {
        this.get('/',['PUBLIC'], usersController.getUsers);
        this.get('/:uid',['PUBLIC'], usersController.getUserById);
        this.post('/',['PUBLIC'], usersController.createUser);
        this.put('/:uid',['PUBLIC'], usersController.updateUser);
        this.delete('/:uid',['PUBLIC'], usersController.deleteUser);
    }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();