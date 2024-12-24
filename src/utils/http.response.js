const HttpStatus = {
	SUCCESS: 200,
	CREATED: 201,
    ACCEPTED: 202,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	SERVER_ERROR: 500,
	DATABASE_ERROR: 503
};

class HttpResponse {

	Success = (res, data) =>{
		return res.status(HttpStatus.SUCCESS).json({
			status: HttpStatus.SUCCESS,
			message: "Success",
			data
		});
	};

	Accepted = (res, data) =>{
        return res.status(HttpStatus.ACCEPTED).json({
            status: HttpStatus.ACCEPTED,
            message: "Request accepted",
            data
        });
    };

	Created = (res, data) =>{
		return res.status(HttpStatus.CREATED).json({
			status: HttpStatus.CREATED,
			message: "Created",
			data
		});
	};

	Updated= (res, data) =>{
        return res.status(HttpStatus.SUCCESS).json({
            status: HttpStatus.SUCCESS,
            message: "Resource updated successfully",
            data
        });
    };

    Deleted = (res) =>{ 
        return res.status(HttpStatus.NO_CONTENT).json({
            status: HttpStatus.NO_CONTENT,
            message: "Resource deleted successfully"
        });
    };

	NoContent = (res, data=null) =>{
		return res.status(HttpStatus.NO_CONTENT).json({
			status: HttpStatus.NO_CONTENT,
			message: "No Content",
			data
		});
	};

	BadRequest = (res,error) =>{
		return res.status(HttpStatus.BAD_REQUEST).json({
			status: HttpStatus.BAD_REQUEST,
			message: "Bad Request",
			error: error.name,
		});
	};

	Unauthorized = (res, error) =>{
		return res.status(HttpStatus.UNAUTHORIZED).json({
			status: HttpStatus.UNAUTHORIZED,
			message: "Unauthorized",
			error: error.name,
		});
	};

	Forbidden = (res, error) =>{
		return res.status(HttpStatus.FORBIDDEN).json({
			status: HttpStatus.FORBIDDEN,
			message: "Ocurrio un error tipo Forbidden",
			error: error.name,
		});
	};

	NotFound = (res, error) =>{
		return res.status(HttpStatus.NOT_FOUND).json({
			status: HttpStatus.NOT_FOUND,
			message: "Ocurrio un error Not Found",
			error: error.name,
		});
	};

	Conflict = (res, error) =>{
		return res.status(HttpStatus.CONFLICT).json({
			status: HttpStatus.CONFLICT,
			message: "Ocurrio un error de Conflict",
			error: error.name,
		});
	};

	ServerError = (res, error) =>{
		return res.status(HttpStatus.SERVER_ERROR).json({
			status: HttpStatus.SERVER_ERROR,
			message: "Ocurrió un error en el servidor",
			error: error.name,
		});
	};

	DatabaseError = (res, error) =>{
		return res.status(HttpStatus.DATABASE_ERROR).json({
			status: HttpStatus.DATABASE_ERROR,
			message: "Ocurrió un error en la base de datos",
			error: error.name,
		});
	};
};

const httpResponse = new HttpResponse();
export default httpResponse;

