'use strict';

const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findUserRating } = require("../../repositories/users.repository");

const getUserRating = async(req, res = response) => {

    try {
        const { id } = req.params;
        const rating = await findUserRating(id);
        res.status( 200 ).json({
            rating
        });
    } catch (error) {
        createJsonError( error, res );
    }
};

module.exports = {
    getUserRating,
};
