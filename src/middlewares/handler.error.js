import { NotFoundError, UnhautorizedError, ForbiddenError, ConflictError, BadRequestError, ServerError } from "./custom.error.js";

export const handlerError = ( error, req, res, next ) => {
    if (error instanceof UnhautorizedError) return res.sendUnauthorized(error);
    if (error instanceof NotFoundError) return res.sendNotFound(error);
    if (error instanceof ForbiddenError) return res.sendForbidden(error);
    if (error instanceof ConflictError) return res.sendConflict(error);
    if (error instanceof BadRequestError) return res.sendBadRequest(error);
    if (error instanceof ServerError) return res.sendServerError(error);
    
};