'use strict';

const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const { findUsers } = require("../../repositories/users.repository");

const getUsers = async(req, res = response) => {

    try {
        const users = await findUsers();

        res.status( 200 ).json({
            users,
        });
    } catch (error) {
        createJsonError( res, error );
    }
};

module.exports = {
    getUsers,
};