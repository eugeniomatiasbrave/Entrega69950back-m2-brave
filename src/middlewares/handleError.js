
const handleHttpError = (req, res, next) => {
	res.sendSuccess = (message) => res.status(200).send({ status: "success", message });
	res.sendBadRequest = (reason) => res.status(400).send({ status: "success", error: reason });
	res.sendUnauthorized = (reason) => res.status(404).send({ error: reason || "Unauthorized" });
	next(); 
	

}

export default handleHttpError
