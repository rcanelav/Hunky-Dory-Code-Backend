'use strict';
const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {  findPublicationLikesGivenByUser } = require("../../repositories/users.repository");

const getUserLikes = async(req, res = response) => {

    try {
        const { params, query } = req;
        const page = parseInt( query.page ) || 1;
        const limit = parseInt( query.limit )  || 10;
        const startIndex = ( page - 1 ) * limit;

        const { id } = params;
        const { likedPublications, totalLikedPublications } = await findPublicationLikesGivenByUser(id, startIndex, limit);

        const data = {};
        data.totalPages = Math.ceil( totalLikedPublications / limit );
        if( page < 1) {
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

        // Publications need to be mapped to be cleaned from atributes like TYPE that only exists to differentiate between posts and answers and rebuild an object to be returned.
        data.results = likedPublications.map( publication => {
            if( publication.type === 'answer' ){
                const { id, post_id: answer_id, user_id, date } = publication;
                return {
                    id,
                    answer_id,
                    user_id,
                    date
                }
            }
            const { type, ...rest } = publication;
            return rest;
        });
        data.totalLikedPublications = totalLikedPublications;

        res.status( 200 ).json( data );
    } catch (error) {
        createJsonError( res, error );
    }
};

module.exports = {
    getUserLikes,
};
