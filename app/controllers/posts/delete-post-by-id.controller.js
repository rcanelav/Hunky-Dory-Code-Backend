'use strict';
const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const { removePostById } = require("../../repositories/posts.repository");

const deletePostById = async(req, res = response) => {
    try {
        const { id } = req.params;
        await removePostById( id );
        res.status(200).json({
            msg: "Post deleted successfully"
        });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = {
    deletePostById,
};