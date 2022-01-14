'use strict';
const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { registerNewTechnology } = require("../../repositories/technologies.repository");

const createTechnology = async(req, res = response) => {
    try {
        const { technology } = req.body;
        const registeredTechnology = await registerNewTechnology(technology);
        if(!registeredTechnology) {
            throwJsonError( 500, "Error registering new technology." );
        }
        res.status(201).json({
            msg: "Technology registered successfully.",
            technology
        });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = {
    createTechnology,
};
