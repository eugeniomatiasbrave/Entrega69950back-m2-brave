import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import PresentUserDTO from '../dto/user/PresentUserDTO.js';

const SECRET_KEY = config.jwt.SECRET_KEY;

const register = (req,res)=>{ 
	res.sendSuccess("Registered")
}

const login = (req,res)=>{ 
    console.log(req.user);
	const sessionUser = new PresentUserDTO(req.user);
	const token = jwt.sign(sessionUser.toObject(), SECRET_KEY ,{expiresIn:'15d'}); // convierto a sessionUser en un objeto plano
	res.cookie('tokencito',token).send({status:"success",message:"logged in"});
}

const current = (req,res)=>{
	if (!req.user) {
		return res.status(401).send({ status: "error", error: "Not logged in" });
	}

	const currentUser = new PresentUserDTO(req.user);
    res.send(currentUser.toObject()); // convierto a currentUser en un objeto plano
}

const logout = (req,res)=>{ 
	res.clearCookie('tokencito').send({ status: "success", message: "logged out" });
}

export default { 
	register,
	login,
	current,
	logout
}