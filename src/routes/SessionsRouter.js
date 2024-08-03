import jwt from 'jsonwebtoken';
import { passportCall } from "../middlewares/passportCall.js";
import BaseRouter from "./BaseRouter.js";

const SECRET_KEY = 'choripa_con_chimichurry';

class SessionsRouter extends BaseRouter {
    init(){
        this.post('/register',['PUBLIC'],passportCall('register'),(req,res)=>{
          res.sendSuccess("Registered"); 
        })
        this.post('/login',['PUBLIC'],passportCall('login'),(req,res)=>{
            console.log(req.user);
            
            const sessionUser = {
                name:`${req.user.firstName} ${req.user.lastName}`,
                role:req.user.role,
                id:req.user._id
            }
            const token = jwt.sign(sessionUser, SECRET_KEY ,{expiresIn:'15d'});
            res.cookie('tokencito',token).send({status:"success",message:"logged in"});
        });

        this.get('/current', ['USER'], (req, res) => {
            if (!req.user) {
                return res.status(401).send({ status: "error", error: "Not logged in" });
            }
            res.send(req.user);
        });

        this.get('/logout', ['USER'], (req, res) => {
           
            res.clearCookie('tokencito').send({ status: "success", message: "logged out" });
        });
    }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();