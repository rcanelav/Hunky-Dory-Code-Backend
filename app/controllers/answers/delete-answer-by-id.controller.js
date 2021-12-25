'use strict';
const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { removeAnswerById } = require("../../repositories/answers.repository");

const deleteAnswerById = async(req, res = response) => {
    try {
        const { id } = req.params;
        await removeAnswerById( id );
        res.status(200).json({
            msg: "Answer deleted successfully"
        });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = {
    deleteAnswerById,
};