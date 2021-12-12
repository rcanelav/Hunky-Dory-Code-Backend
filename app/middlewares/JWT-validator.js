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
        
        const { id, name, lastname, role, iat } = jwt.verify( token, process.env.JWT_SECRET );

        const user = await findUserById( id );
        if( !user ) {
            throwJsonError( 404, 'Invalid token - ID' );
        }
        if( !user.verifiedAt ) {
            throwJsonError( 403, 'Invalid token - Changes need to be confirmed (email)' );
        }
        
        const date = user.lastAuthUpdate;
        const lastAuth = new Date(date);
        const tokenEmissionDate = new Date( iat * 1000 );
        if( tokenEmissionDate < lastAuth ) {
            throwJsonError( 403, 'Invalid token - Token expired' );
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