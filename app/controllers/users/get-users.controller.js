'use strict';

const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");


const getUsers = (req, res = response) => {

    try {
        // const { role } = req.auth;

        res.status( 200 ).json({
            msg: 'get users',
        })
        
    } catch (error) {
        createJsonError( res, error );
    }

    
};


module.exports = {
    getUsers,
};