import usersMocksModel from "../dao/mongo/models/usersMoks.model.js";
import { generateUser } from "../utils/user.utils.js";

const createUsersMock = async (cant = 50) => {
  try {
    const users = [];
    for (let i = 0; i < cant; i++) {
      const user = await generateUser();
      console.log(user)
      users.push(user);
    }
    return await usersMocksModel.create(users);
  } catch (error) {
    throw new Error(error);
  }
};

const getUsers = async () => {
  try {
    return await usersMocksModel.find({})
  } catch (error) {
    throw new Error(error);
  }
};

export default {  
  createUsersMock,
  getUsers
 }


