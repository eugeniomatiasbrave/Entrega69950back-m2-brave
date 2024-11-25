
export class NotFoundError extends Error {
	constructor(message) {
		super(message);
		this.name = "NotFound Error";
	}
} 

export class UnhautorizedError extends Error {
	constructor(message) {
		super(message);
		this.name = "Unauthorized Error";
	}
}

export class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = "Forbidden Error";
    }
}

export class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequest Error";
    }
}

export class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = "Conflict Error";
    }
}

export class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = "Server Error";
    }
}