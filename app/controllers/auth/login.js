'use strict';

const bcryptjs = require("bcryptjs");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const generateJWT = require("../../helpers/generateJWT");
const { findUserByEmail } = require("../../repositories/users.repository");


const login = async ( req, res ) => {

    try {
        const { email, password } = req.body;
        const user = await findUserByEmail( email );
        if( !user ) {
            throwJsonError( 403, 'Invalid user/password - email');
        }
        if( user.status === 'INACTIVE'){
            throwJsonError( 403, 'User is inactive. Please contact the administrator');
        }

        const validPassword = bcryptjs.compare( password, user.password );
        if ( !validPassword ) {
            throwJsonError( 403, 'Invalid user/password - password');
        }
        
        const token = await generateJWT( user );
        const { id, name, lastname, role } = user;
        const response = {
            accessToken: token,
            user : {
                id,
                name,
                lastname,
                email,
                role,
            },
        };

        res.status( 200 ).json( {
            response
        } );
    } catch ( error ) {
        createJsonError( error, res );
    }
};

module.exports = login;