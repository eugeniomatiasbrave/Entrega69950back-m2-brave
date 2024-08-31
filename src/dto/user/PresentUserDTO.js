export default class PresentUserDTO {
	id;
	name;
	email;
    constructor(user) {
 	    this.id = user._id;		
	    this.name = `${user.firstName} ${user.lastName}`;
	    this.email = user.email;
  }
}