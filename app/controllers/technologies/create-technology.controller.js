'use strict';
const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findTechnologyById } = require("../../repositories/technologies.repository");

const createTechnology = async(req, res = response) => {
    try {
        const { technology } = req.body;
        res.status(201).json({
            technology
        });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = {
    createTechnology,
};
