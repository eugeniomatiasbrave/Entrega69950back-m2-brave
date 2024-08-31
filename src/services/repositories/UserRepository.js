
export default class UserRepository {
	constructor(dao) {
		this.dao = dao;
	}

	getUsers() {
		return this.dao.get();
	}

	getUserById(userId) {
		return this.dao.getUserById({ _id: userId });
	}

	getUserByEmail(email) {
        return this.dao.getUserByEmail(email);
    }
	
	createUser(user) {
		return this.dao.create(user);
	}
};