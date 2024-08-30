import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const SECRET_KEY = config.jwt.SECRET_KEY;

const register = (req,res)=>{ 
	res.sendSuccess("Registered")
}

const login = (req,res)=>{ 
    console.log(req.user);
	const sessionUser = {
		name:`${req.user.firstName} ${req.user.lastName}`,
		role:req.user.role,
		id:req.user._id
	}
	const token = jwt.sign(sessionUser, SECRET_KEY ,{expiresIn:'15d'});
	res.cookie('tokencito',token).send({status:"success",message:"logged in"});
}

const current = (req,res)=>{
	if (!req.user) {
		return res.status(401).send({ status: "error", error: "Not logged in" });
	}
	res.send(req.user);
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