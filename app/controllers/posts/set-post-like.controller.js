'use strict';
const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findPostLikeByUserId, removePostLike, setPostLike } = require("../../repositories/posts.repository");

const managePostLike = async(req, res = response) => {
    try {
        const { id: user_id } = req.auth;
        const { id: post_id } = req.params;
       
        const hasBeenLiked = await findPostLikeByUserId(post_id, user_id);
        if (hasBeenLiked) {
            const likedRemoved = await removePostLike(post_id, user_id);
            if (!likedRemoved) {
                throwJsonError(500, "Error removing like.");
            }
            return res.status(200).json({ msg: "Like removed." });
        }

        const likedPost = await setPostLike(post_id, user_id);
        if(!likedPost) {
            throwJsonError(500, "Error giving like to post.");
        }

        res.status(200).json({
            msg: "Post liked",
        });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = {
    managePostLike,
};