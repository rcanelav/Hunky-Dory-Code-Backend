'use strict';
const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findTechnologyById } = require("../../repositories/technologies.repository");

const getTechnologyById = async(req, res = response) => {
    try {
        const { id } = req.params;
        const technologies = await findTechnologyById(id);
        if (!technologies) throwJsonError(404, "Technology not found");
        res.status(200).json({
            technologies
        });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = {
    getTechnologyById,
};
