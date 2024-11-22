import UserMoks from '../services/UserMoks.js';

const createUser = async (req, res) => {
  try {
    const { cant } = req.query;
    const response = UserMoks.createUsersMock(cant);
    res.json(response);
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const response = await UserMoks.getUsers();
    res.json(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default{ 
  createUser, 
  getUsers 
};


