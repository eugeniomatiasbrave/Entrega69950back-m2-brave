import ticketModel from "./models/ticket.model.js";

export default class TicketsDAO {

    get = () =>{
        return ticketModel.find().lean();
    }

    getBy = (params) =>{
        return ticketModel.findOne(params).lean();
    }

    create = (ticket) =>{
        return ticketModel.create(ticket);
    }
}