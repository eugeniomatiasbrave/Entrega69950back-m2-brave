
const handleHttpError = (req, res, next) => {
    res.sendSuccess = (message) => res.status(200).send({ status: "success", message, data });
    res.sendBadRequest = (message) => res.status(400).send({ status: "error", message });
    res.sendUnauthorized = (message) => res.status(401).send({ status: "error", message: message || "Unauthorized" });
    res.sendForbidden = (message) => res.status(403).send({ status: "error", message: message || "Forbidden" });
    res.sendNotFound = (message) => res.status(404).send({ status: "error", message: message || "Not Found" });
    res.sendServerError = (message) => res.status(500).send({ status: "error", message: message || "Internal Server Error" });
    next();
};

export default handleHttpError
