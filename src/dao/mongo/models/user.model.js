import mongoose from 'mongoose';

const collection = "Users";
const schema = new mongoose.Schema({

	firstName:{
		type:String,
		required:true
	},
	lastName: {
		type:String,
		required:true
	},
	email: {
		type:String,
		required:true,
		unique:true,
		index:true
	},
	birthDate: {
		type:Date
	},
	password: {
		type:String,
		required:true
	},
	//agrega un cardId para relacionar con el carrito
	cartId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Carts'
	},
	role: {
		type:String,
		required:true,
		enum:['user','admin'],
		default:'user'
	}
});

schema.pre(['find','findOne'], function(){
	this.populate('cartId')
})

const userModel = mongoose.model(collection, schema);

export default userModel;