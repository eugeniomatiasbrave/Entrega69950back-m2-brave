import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import PresentUserDTO from '../dto/user/PresentUserDTO.js';
import { usersService} from "../services/repositories.js";
import AuthService from "../services/AuthService.js";

const SECRET_KEY = config.jwt.SECRET_KEY;
const ADMIN_USER = config.app.ADMIN_USER;
const ADMIN_PWD = config.app.ADMIN_PWD;

const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, birthDate } = req.body;
        //console.log('body',req.body);

        if (!email || !password || !firstName || !lastName || !birthDate) {  // Validaciones de los campos
            return res.status(400).send({ message: "Todos los campos son obligatorios" });
        }

        let role = 'user';
        if (email === ADMIN_USER && password === ADMIN_PWD) {
            role = 'admin';
        }

        const authService = new AuthService();
        const hashedPassword = await authService.hashPassword(password);

        const newUser = {
            firstName,
            lastName,
            email,
            birthDate,
            password: hashedPassword,
            role,
            cartId: null
        };
        //console.log( 'new User:', newUser);
        await usersService.createUser(newUser);
        res.send("Registered");
    } catch (error) {
        res.status(500).send({ message: "Error al registrar el usuario", error: error.message });
    }
};

const login = async (req,res)=>{ 
	const sessionUser = new PresentUserDTO(req.user);
	const token = jwt.sign(sessionUser.toObject(), SECRET_KEY ,{expiresIn:'15d'}); // convierto a sessionUser en un objeto plano
	res.cookie('tokencito',token);
    //console.log(token);
    res.send({ status: "success", message: "Logged in successfully", token });  
}

const current = (req,res)=>{
	if (!req.user) {
		return res.status(401).send({ status: "error", error: "Not logged in" });
	}
	const currentUser = new PresentUserDTO(req.user);
    res.send(currentUser.toObject()); // convierto a currentUser en un objeto plano
}

const logout = (req,res)=>{ 
	res.clearCookie('tokencito').redirect('/');
}

export default { 
	register,
	login,
	current,
	logout
}