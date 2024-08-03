import { Router } from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';
import { passportCall } from "../middlewares/passportCall.js";

//Un router de session se suele utilizar para operaciones concernientes a la sesión del usuario como:
// Registro, Login, ThirdPartyAuth, Current (Acceder a la info de la sesión actual);

const sessionsRouter = Router();

sessionsRouter.post('/register',passportCall('register'),async(req,res)=>{
    res.send({status:"success",message:"Registered"})
})

sessionsRouter.post('/login',passportCall('login'),async(req,res)=>{
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

sessionsRouter.get('/current',async(req,res)=>{
    if(!req.user){
        return res.status(401).send({status:"error",error:"Not logged in"});
    }
    res.send(req.user);
})

sessionsRouter.get('/logout',async(req,res)=>{
    res.clearCookie('tokencito');
})

export default sessionsRouter;