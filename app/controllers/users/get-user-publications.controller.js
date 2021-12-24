'use strict';
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {findUserAnswers, findUserPosts} = require("../../repositories/users.repository");

const getUserPublicationsById = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { id, type } = req.params;
        const startIndex = (page - 1) * limit;

        let publications;
        let totalPublications;
        if ( type === 'answers' ){
            const { answers, totalAnswers } = await findUserAnswers( id, startIndex, limit);
            publications = answers;
            totalPublications = totalAnswers;
        }else{
            const { posts, totalPosts } = await findUserPosts( id, startIndex, limit);
            publications = posts;
            totalPublications = totalPosts;
        }

        const data = {};
        data.totalPages = Math.ceil(totalPublications / limit);  
        if(page > data.totalPages || page < 1) {
            throwJsonError(404, "Page not found");
        }

        if( startIndex ){
            data.previous = {
                page: page - 1,
                limit,
            };
        }
        if( page < data.totalPages ){
            data.next = {
                page: page + 1,
                limit,
            };
        }
        data.results = publications;
        res.status( 200 ).json( data );
    } catch (error) {
      createJsonError(error, res);
    }
};

module.exports = {
    getUserPublicationsById
};