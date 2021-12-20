'use strict';

const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { sendSuccessfulActivationEmail } = require("../../helpers/mail-smpt");
const { activateUser, getUserByVerificationCode } = require("../../repositories/users.repository");

async function validateUserActivation( req, res = response){

    try {
        const { code } = req.query;
        if ( !code ){
            throwJsonError( 400, "Missing activation code." );
        }
        const isActivated = await activateUser( code );
        if ( !isActivated ){
            throwJsonError( 400, "Invalid activation code." );
        }
        const user = await getUserByVerificationCode( code );
        const { name, email } = user;
        await sendSuccessfulActivationEmail( name, email );
        
        res.status( 200 ).json( {
            msg: "User successfully activated."
        } );
    } catch (error) {
        createJsonError(error, res);
    }
}

module.exports = {validateUserActivation};