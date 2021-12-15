const { response } = require("express");
const createJsonError = require("../errors/create-json-error");
const throwJsonError = require("../errors/throw-json-error");


const isAdminRole = (req, res = response, next) => {
    
    try {
        const { role, name } = req.auth;

        if( !req.auth ){
            throwJsonError( 500, 'Token needs to be verified first. Please, log in again.' );
        }

        if( role !== 'ADMIN' ){
            throwJsonError( 401, `User: ${ name } is not an admin.`)
        }

        next();
    } catch (error) {
        createJsonError( error, res )
    }
};

const isValidRole = ( ...roles ) => {
    return ( req, res = response, next ) => {
        try {
            if( !req.auth ){
                throwJsonError( 500, 'Token needs to be verified first. Please, log in again.' );
            }
    
            if( !roles.includes( req.auth.role ) ){
                throwJsonError( 401, `Invalid role to access this resource.`)
            }
            next();
        } catch (error) {
            createJsonError( error, res );
        }
    };

};


module.exports = {
    isAdminRole,
    isValidRole
};