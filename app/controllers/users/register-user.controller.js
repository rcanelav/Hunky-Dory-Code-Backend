'use strict';
const bcryptjs = require('bcryptjs');
const { response, request } = require('express');
const randomstring = require('randomstring');

const createJsonError = require("../../errors/create-json-error");
const { sendRegisterEmail } = require('../../helpers/mail-smpt');
const { createUser } = require('../../repositories/users.repository');


async function registerUser( req = request, res = response ) {
    try {
        const { body } = req;
        const { name, lastname = '', email, password, role } = body;
        
        const passwordHash = await bcryptjs.hash( password, 12 );
        const verificationCode = randomstring.generate(64);
        const image = 'https://res.cloudinary.com/rayci/image/upload/v1646251811/xt5sm7uuzywetb30umac.jpg';
        const userDB = { name, lastname, email, passwordHash, verificationCode, role, image };
        const userId = await createUser( userDB );
        await sendRegisterEmail(name, email, verificationCode);
        
        res.status(201).json({
            id: userId,
            msg: 'User created successfully'
        })
    } catch (error) {
        createJsonError( error, res );
    }
}

module.exports = {registerUser};