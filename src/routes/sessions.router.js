import { Router } from "express";
//import { usersService } from "../managers/index.js";
//import AuthService from "../services/AuthService.js";
import passport from "passport";

//Un router de session se suele utilizar para operaciones concernientes a la sesión del usuario como:
// Registro, Login, ThirdPartyAuth, Current (Acceder a la info de la sesión actual);

const sessionsRouter = Router();

sessionsRouter.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/registerFail',failureMessage:true}),async(req,res)=>{
    res.send({status:"success",message:"Registered"})
})

sessionsRouter.get('/registerFail',(req,res)=>{
    console.log("Algo tronó");
    res.send("error");
})

sessionsRouter.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/failureLogin',failureMessage:true}),async(req,res)=>{
    res.send({status:"success",message:"logged in"});
})

sessionsRouter.get('/failureLogin',(req,res)=>{
    console.log(req.session);
    if(req.session.messages.length>4){
        //Aquí implemento lógica de bloqueo.
        return res.send("Excediste el número de intentos fallidos")
    }
    res.send("error");
})

sessionsRouter.get('/current',async(req,res)=>{
    if(!req.user){
        return res.status(401).send({status:"error",error:"Not logged in"});
    }
    res.send(req.user);
})

sessionsRouter.get('/logout',async(req,res)=>{
    console.log("Ok");
    req.session.destroy(error=>{
        if(error) return res.status(500).send({status:"error",error:"Couldn't close session"})
            res.redirect('/login')
        })
});


export default sessionsRouter;