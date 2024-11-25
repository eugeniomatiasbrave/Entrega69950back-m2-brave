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
	SERVER_ERROR: 500
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
			message: error.message,
			error: error.name,
		});
	};

	Unauthorized = (res, error) =>{
		return res.status(HttpStatus.UNAUTHORIZED).json({
			status: HttpStatus.UNAUTHORIZED,
			message: error.message,
			error: error.name,
		});
	};

	Forbidden = (res, error) =>{
		return res.status(HttpStatus.FORBIDDEN).json({
			status: HttpStatus.FORBIDDEN,
			message: error.message,
			error: error.name,
		});
	};

	NotFound = (res, error) =>{
		return res.status(HttpStatus.NOT_FOUND).json({
			status: HttpStatus.NOT_FOUND,
			message: error.message,
			error: error.name,
		});
	};

	Conflict = (res, error) =>{
		return res.status(HttpStatus.CONFLICT).json({
			status: HttpStatus.CONFLICT,
			message: error.message,
			error: error.name,
		});
	};

	ServerError = (res, error) =>{
		return res.status(HttpStatus.SERVER_ERROR).json({
			status: HttpStatus.SERVER_ERROR,
			message: error.message,
			error: error.name,
		});
	};

};

const httpResponse = new HttpResponse();
export default httpResponse;

