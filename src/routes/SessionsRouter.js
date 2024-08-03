import jwt from 'jsonwebtoken';

import { passportCall } from "../middlewares/passportCall.js";
import BaseRouter from "./BaseRouter.js";

class SessionsRouter extends BaseRouter {
    init(){
        this.post('/register',['PUBLIC'],passportCall('register'),(req,res)=>{
          res.sendSuccess("Registered"); 
        })
        this.post('/login',['PUBLIC'],passportCall('login'),(req,res)=>{
            console.log(req.user);
            //Para JWT, ahora yo tengo la responsabilidad de generar mi propia sesión.
            const sessionUser = {
                name:`${req.user.firstName} ${req.user.lastName}`,
                role:req.user.role,
                id:req.user._id
            }
            const token = jwt.sign(sessionUser,'secretitoshhhhh',{expiresIn:'1d'});
            res.cookie('tokencito',token).send({status:"success",message:"logged in"});
        })
    }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();