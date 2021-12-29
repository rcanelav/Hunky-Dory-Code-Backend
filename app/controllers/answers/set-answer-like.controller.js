'use strict';
const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findAnswerById, setLike, removeAnswerLike, findAnswerLikeByUserId } = require("../../repositories/answers.repository");

const manageAnswerLike = async(req, res = response) => {
    try {
        const { id: user_id } = req.auth;
        const { id: answer_id } = req.params;
       
        const hasBeenLiked = await findAnswerLikeByUserId(answer_id, user_id);
        if (hasBeenLiked) {
            const likedRemoved = await removeAnswerLike(answer_id, user_id);
            if (!likedRemoved) {
                throwJsonError(500, "Error removing like.");
            }
            return res.status(200).json({ msg: "Like removed." });
        }

        const likedAnswer = await setLike(answer_id, user_id);
        if(!likedAnswer) {
            throwJsonError(500, "Error giving like to answer.");
        }

        res.status(200).json({
            msg: "Answer liked",
        });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = {
    manageAnswerLike,
};