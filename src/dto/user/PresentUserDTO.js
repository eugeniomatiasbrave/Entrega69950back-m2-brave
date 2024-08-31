export default class PresentUserDTO {

    constructor(user) {
 	    this.id = user._id;		
	    this.name = `${user.firstName} ${user.lastName}`;
	    this.email = user.email;
        this.role = user.role;
    }
	
	toObject() {
        return {
			id: this.id,
			name: this.name,
			email: this.email,
			role: this.role
		}
	}
}