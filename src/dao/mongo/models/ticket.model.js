import mongoose from 'mongoose';

const collection = "Tickets";

const schema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        default: () => Math.random().toString(36).substr(2, 9).toUpperCase() // Genera un código único
    },
    purchase_datetime: {
        type: Date,
        default: Date.now // Guarda la fecha y hora exacta de la compra
    },
    amount: { //total de la compra
        type: Number,
        required: true
    },
    purchaser: { // el correo del usuario asociado al carrito.
        type: String,
        required: true
    }
});

const ticketModel = mongoose.model(collection, schema);

export default ticketModel;
