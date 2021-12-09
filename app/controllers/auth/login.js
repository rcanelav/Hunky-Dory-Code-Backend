'use strict';

const bcryptjs = require("bcryptjs");
const randomstring = require("randomstring");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const generateJWT = require("../../helpers/generateJWT");
const { googleVerify } = require("../../helpers/google-verifier");
const { sendRegisterEmail } = require("../../helpers/mail-smpt");
const { findUserByEmail, createUserByGoogleAuth, findUserById } = require("../../repositories/users.repository");


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
        const response = {
            accessToken: token,
            // user : {
            //     id,
            //     name,
            //     lastname,
            //     email,
            //     role,
            // },
        };

        res.status( 200 ).json( {
            response
        } );
    } catch ( error ) {
        createJsonError( error, res );
    }
};

const googleSignIn = async ( req, res ) => {
    try {
        const { id_token } = req.body;
        const { name, email, image } = await googleVerify( id_token );

        let user = await findUserByEmail( email );
        if( !user ) {
            
            const passwordHash = await bcryptjs.hash( randomstring.generate(8), 12 );
            const firstname = name.split(' ')[0];
            const lastname = name.split(' ')[1];
            const verificationCode = randomstring.generate(64);
            const userDB = { 
                name: firstname, 
                lastname, 
                email, 
                passwordHash, 
                verificationCode,
                userRole: 1,
                image, 
                google: true,
            };
            const userId = await createUserByGoogleAuth( userDB );
            console.log(userId)
            user = await findUserById( userId );
            await sendRegisterEmail(name, email, verificationCode);
        }

        const token = await generateJWT( user );

        res.status(201).json( {
            token,
        } );

    } catch (error) {
        createJsonError( error, res );
    }
};

module.exports = {
    login,
    googleSignIn,
};