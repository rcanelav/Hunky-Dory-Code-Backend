const jwt = require('jsonwebtoken');
const throwJsonError = require('../errors/throw-json-error');

const generateJWT = ( user ) => {
    const { id, name, lastname, role } = user;
    return new Promise( ( resolve, reject) => {
        const payload = {
            id,
            name,
            lastname,
            role,
        };
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '4h',
        }, ( err, token ) => {
            if( err ) {
                console.log(err);
                reject( 'Generate JWT error' );
            } else {
                resolve( token );
            }
        });
    });
};

module.exports = generateJWT;