const throwJsonError = require("../errors/throw-json-error");
const { findUserByEmail } = require("../repositories/users.repository");


const isExistingEmail = async( email = '' ) => {
    const emailExists = await findUserByEmail( email );
    if ( emailExists ){
        throwJsonError( 400, `Email: ${ email } already exists.` );
    }
};

module.exports = {
    isExistingEmail,
};