const createJsonError = require("../errors/create-json-error");
const throwJsonError = require("../errors/throw-json-error");


const userRequestValidator = (req, res, next) => {
    try {
        const { id } = req.params;
        const { id: userId } = req.auth;
        
        if( userId !== Number(id) ) {
            throwJsonError(404, 'ID does not match. Request denied.');
        }
        next();
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = {userRequestValidator};