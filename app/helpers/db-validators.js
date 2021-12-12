const throwJsonError = require("../errors/throw-json-error");
const { findUserByEmail, findUserById } = require("../repositories/users.repository");


const isExistingEmail = async( email = '' ) => {
    const emailExists = await findUserByEmail( email );
    if ( emailExists ){
        throwJsonError( 400, `Email: ${ email } already exists.` );
    }
};
const isExistingUserById = async( id ) => {
    const userExists = await findUserById( id);
    if ( !userExists ){
        throwJsonError( 400, `User with id: ${ id } does not exist.` );
    }
};

const isUserActive = async ( email ) => {
    const user = await findUserByEmail( email );
    if ( !user ){
        throwJsonError( 400, `User does not exist.` );
    }
    if ( !user.verifiedAt ){
        throwJsonError( 400, `User with email: ${ email } is not active.` );
    }
};

module.exports = {
    isExistingEmail,
    isExistingUserById,
    isUserActive,
};