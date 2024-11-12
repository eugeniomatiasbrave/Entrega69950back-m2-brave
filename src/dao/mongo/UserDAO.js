import usersModel from "./models/user.model.js";

export default class UserDAO {

    get(){
        return usersModel.find();
    }

    getUserById(userId){
        return usersModel.findOne(userId).lean();
    }
   
    getUserByEmail(email){
        return usersModel.findOne({email});
    }
  
    create(user){
        return usersModel.create(user);
    }
}
