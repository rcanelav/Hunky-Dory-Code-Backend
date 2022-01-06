'use strict';
const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { createNewPost } = require("../../repositories/posts.repository");
const { findTechnologies } = require("../../repositories/technologies.repository");

const getTechnologies = async(req, res = response) => {
    try {
        const technologies = await findTechnologies();
        res.status(201).json({
            technologies
        });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = {
    getTechnologies,
};
