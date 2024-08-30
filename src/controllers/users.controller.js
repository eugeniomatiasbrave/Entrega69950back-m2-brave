import { usersService } from "../services/repositories.js";

const getUsers = async(req, res) => {
  const users = await  usersService.getUsers()
  res.send(users);
};

const createUser = async (req, res) => {
  const user = req.body;
  await usersService.createUser(user);
  res.sendStatus(200);
};

export default {
  getUsers,
  createUser
};