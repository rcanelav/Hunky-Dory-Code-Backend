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
        const answersData = await findUserAnswers(userId, startIndex, limit);
        const { answers, totalAnswers } = answersData;
        
        const data = {};
        data.totalPages = Math.ceil(totalAnswers / limit);  
        if(page > data.totalPages || page < 1) {
            throwJsonError(404, "Page not found");
        }

        if( startIndex ){
            data.previous = {
                page: page - 1,
                limit,
            };
        }
        if( page < data.totalPages){
            data.next = {
                page: page + 1,
                limit,
            };
        }
        data.results = answers;
        res.status( 200 ).json( data );
    } catch (error) {
      createJsonError(error, res);
    }
};

module.exports = {
    getUserAnwersById
};