import mongoose from 'mongoose';

const collection = "UsersMocks";
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
	cartId: {
		type: Array,
		default: [] // Agrega un array vacío por defecto
	},
	role: {
		type:String,
		default:'user'       
	}
});

const usersMocksModel = mongoose.model(collection, schema);
export default usersMocksModel;