import { usersService} from "../services/repositories.js";
import AuthService from "../services/AuthService.js";
import config from '../config/config.js';

const ADMIN_USER = config.app.ADMIN_USER;
const ADMIN_PWD = config.app.ADMIN_PWD;

const getUsers = async (req, res) => {
    try {
        const users = await usersService.getUsers();
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener los usuarios", error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await usersService.getUserById(req.params.uid);
        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener el usuario", error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { email, password, firstName, lastName, birthDate } = req.body;

        if (!email || !password || !firstName || !lastName || !birthDate) {
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

        await usersService.createUser(newUser);
        res.send("User created");
    } catch (error) {
        res.status(500).send({ message: "Error al crear el usuario", error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await usersService.updateUser(req.params.uid, req.body);
        res.send(updatedUser);
    } catch (error) {
        res.status(500).send({ message: "Error al actualizar el usuario", error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await usersService.deleteUser(req.params.uid);
        res.send({ message: "Usuario eliminado con éxito" });
    } catch (error) {
        res.status(500).send({ message: "Error al eliminar el usuario", error: error.message });
    }
};

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};