import usersModel from "./models/user.model.js";

export default class UserDAO {

    get(){
        return usersModel.find();
    }

    create(user){
        return usersModel.create(user);
    }
}
