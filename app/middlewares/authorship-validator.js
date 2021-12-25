const { response } = require("express");
const createJsonError = require("../errors/create-json-error");
const throwJsonError = require("../errors/throw-json-error");
const { findAnswerById } = require("../repositories/answers.repository");
const { findUserById } = require("../repositories/users.repository");



const authorshipValidator = async(req, res = response, next) => {
    
    try {
        const { id } = req.auth;
        const { id: answerId } = req.params;
        const answer = await findAnswerById(answerId);
        const user = await findUserById(id);
        const { role } = user;

        if ( !answer ) {
            throwJsonError(404, "Answer not found");
        }
        const { postedBy } = answer;
        
        if ( postedBy !== id && role !== "ADMIN" ) {
            throwJsonError(403, "You are not allowed to delete this answer");
        }

        next();
    } catch (error) {
        createJsonError( error, res );
    }
};

module.exports = {
    authorshipValidator,
};