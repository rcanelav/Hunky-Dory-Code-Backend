'use strict';

const bcryptjs = require("bcryptjs");
const { response } = require("express");
const randomstring = require("randomstring");
const throwJsonError = require("../../errors/throw-json-error");
const { sendUpdateConfirmationEmail } = require("../../helpers/mail-smpt");
const { findUserById, findUserByEmail, updateUser, updateVerificationCode } = require("../../repositories/users.repository");


const updateUserById = async( req, res = response) => {
    const{ id } = req.auth;
    const { name, lastname, email, password } = req.body;

    const userLogged = await findUserById( id );
    const userExists = await findUserByEmail( email );

    if( userExists && userExists.id !== id ){
        throwJsonError( 409, 'Email already in use' );
    }
    let updatePassword;
    if( password ) {
        const passwordHash = await bcryptjs.hash( password, 12 );
        updatePassword = passwordHash;
    }
    await updateUser( { id, 
                        name,
                        lastname, 
                        email, 
                        password: updatePassword, 
                    } );

    if( email !== userLogged.email){
        const verificationCode = randomstring.generate(64);

        await updateVerificationCode(id, verificationCode);
        await sendUpdateConfirmationEmail(name, email, verificationCode);
    }
    res.status( 200 ).json({
        ok: true,
    })
};

module.exports = updateUserById;