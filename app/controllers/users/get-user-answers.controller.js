
'use strict';

const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {findUserAnswers} = require("../../repositories/users.repository");

const getUserAnwersById = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
       
        const userId = req.params.id;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const data = {};
        
        const answers = await findUserAnswers(userId, startIndex, limit);
        // data.count = answers.length;

        if( startIndex > 0){
            data.previous = {
                page: page - 1,
                limit,
            };
        }

        if( endIndex < answers.length){
            data.next = {
                page: page + 1,
                limit,
            };
        }
        data.results = answers;
      
      res.status( 200 ).json( {
        data,
      } );
    } catch (error) {
      createJsonError(error, res);
    }
}

module.exports = {
    getUserAnwersById
};