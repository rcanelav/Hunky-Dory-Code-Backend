'use strict';
const jwt = require('jsonwebtoken');
const { response } = require("express");
const createJsonError = require("../errors/create-json-error");
const throwJsonError = require("../errors/throw-json-error");
const { findUserById } = require('../repositories/users.repository');

const extractAccessToken = ( headers ) => {
    const { authorization } = headers;
    if( !authorization || !authorization.startsWith( 'Bearer ' ) ) {
        throwJsonError( 403, 'Authorization (token) required.' );
    }
    return authorization.split(' ')[1];
}

const validateJWT = async ( req, res = response, next ) => {
    try {
        const { headers } = req;
        const token = extractAccessToken( headers );
        
        const { id, name, lastname, role } = jwt.verify( token, process.env.JWT_SECRET );

        const user = await findUserById( id );
        if( !user ) {
            throwJsonError( 404, 'Invalid token - ID' );
        }
        if( user.status !== 'ACTIVE' ) {
            throwJsonError( 403, 'Invalid token - inactive user' );
        }
        req.auth = { id, name, lastname, role};
        next();
    } catch (error) {
        createJsonError( error, res );
    }
};

module.exports = {
    validateJWT
};