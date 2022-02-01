'use strict';
const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const { findPostAnswers } = require("../../repositories/posts.repository");

const getPostAnswers = async(req, res = response) => {
    try {
        const { id } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;

        if( page < 1 ){
            throwJsonError(404, "Page not found.");
        }
        const { answers, totalAnswers } = await findPostAnswers( id, limit, startIndex );
        const data = {};
        data.totalPages = Math.ceil( totalAnswers / limit );
        data.totalAnswers = totalAnswers;
        if( startIndex ){
            data.previous = {
                page: page - 1,
                limit,
            }
        }
        if( page < data.totalPages ){
            data.next = {
                page: page + 1,
                limit,
            }
        }
        data.results = answers;
        res.status(200).json({
            data
        });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = {
    getPostAnswers,
};
