import httpResponse from '../utils/http.response.js';

const handlerSend = (req, res, next) => {
    res.sendSuccess = (data) => httpResponse.Success(res, data);
	res.sendAccepted = (data) => httpResponse.Accepted(res, data);
	res.sendDeleted = () => httpResponse.Deleted(res);
	res.sendUpdated = (data) => httpResponse.Updated(res, data);
    res.sendCreated = (data) => httpResponse.Created(res, data);
	res.sendNoContent = (data=null) => httpResponse.NoContent(res, data);
    res.sendBadRequest = (error) => httpResponse.BadRequest(res, error);
	res.sendForbidden = (error) => httpResponse.Forbidden(res, error);
    res.sendNotFound = (error) => httpResponse.NotFound(res, error);
	res.sendConflict = (error) => httpResponse.Conflict(res, error);
	res.sendUnauthorized = (error) => httpResponse.Unauthorized(res, error);
    res.sendServerError = (error) => httpResponse.ServerError(res, error);
    next();
};

export default handlerSend;