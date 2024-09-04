
export default class TicketRepository {

	constructor(dao) {
        this.dao = dao;
	}

    getTickets = () =>{
        return this.dao.get().lean();
    }

    getTicketBy = (params) =>{
        return this.dao.getBy(params).lean();
    }

    createTicket = (ticket) =>{
        return this.dao.create(ticket);
    }
}
