'use strict';
const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { createNewAnswer } = require("../../repositories/answers.repository");
const { createNewPost } = require("../../repositories/posts.repository");

const createAnswer = async(req, res = response) => {
    try {
        const { content } = req.body;
        const { id: postedBy } = req.auth;
        const { id: posts_id } = req.params;

        const answer = {
            content,
            postedBy,
            posts_id,
        };
        const newPostId = await createNewAnswer(answer);
        if( !newPostId ) throwJsonError( 500, 'Internal Server Error, impossible to create new post.' );

        res.status(201).json({
            post_id: newPostId,
            msg: 'Post created successfully.',
        });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = {
    createAnswer,
};
