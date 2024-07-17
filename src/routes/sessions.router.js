import { Router } from "express";
import { usersService } from "../managers/index.js";

//Un router de session se suele utilizar para operaciones concernientes a la sesión del usuario como:
// Registro, Login, ThirdPartyAuth, Current (Acceder a la info de la sesión actual);

const sessionsRouter = Router();

sessionsRouter.post('/register',async(req,res)=>{
    const {firstName,lastName,email,birthDate,password} = req.body;
    if(!firstName||!lastName||!email||!password){
        return res.status(400).send({status:"error",error:"Incomplete values"});
    }
    const user = await usersService.getUserByEmail(email);
    if(user){
        return res.status(400).send({status:"error",error:"User already exists"})
    };
    let parsedDate;
    if(birthDate){
        parsedDate = new Date(birthDate).toISOString();
    }
    const newUser = {
        firstName,
        lastName,
        email,
        birthDate:parsedDate,
        password
    }
    const result = await usersService.createUser(newUser);
    res.send({status:"success",message:"Registered"})
})


export default sessionsRouter;