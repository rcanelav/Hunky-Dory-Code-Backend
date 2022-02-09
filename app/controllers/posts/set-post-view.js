'use strict';
const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findAnswerLikes } = require("../../repositories/answers.repository");
const { addPostView } = require("../../repositories/posts.repository");


const setPostView = async(req, res = response) => {
    try {
        const { id } = req.params;
        const viewedPost = await addPostView( id );
        if(!viewedPost) throwJsonError(500, "Error adding view to post.");
        res.status(200).json(`Post ${id} viewed`);
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = {
    setPostView,
};