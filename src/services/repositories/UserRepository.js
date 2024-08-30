
export default class UserRepository {
	constructor(dao) {
		this.dao = dao;
	}

	getUsers() {
		return this.dao.get();
	}
	
	createUser(user) {
		return this.dao.create(user);
	}
};