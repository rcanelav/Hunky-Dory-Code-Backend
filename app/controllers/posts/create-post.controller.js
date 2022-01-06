'use strict';
const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { createNewPost } = require("../../repositories/posts.repository");

const createPost = async(req, res = response) => {
    try {
        const { title, content, technology } = req.body;
        const { id: postedBy } = req.auth;

        const post = {
            title,
            content,
            technology,
            postedBy,
        };
        const newPostId = await createNewPost(post);
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
    createPost,
};
