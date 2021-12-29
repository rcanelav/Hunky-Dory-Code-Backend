'use strict';
const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findPostLikes } = require("../../repositories/posts.repository");


const getPostLikes = async(req, res = response) => {
    try {
        const { id } = req.params;
        const likes = await findPostLikes( id );
        if(!likes) {
            throwJsonError(500, "Error getting likes.");
        }

        res.status(200).json(likes);
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = {
    getPostLikes,
};