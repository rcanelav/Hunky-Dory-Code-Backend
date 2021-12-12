const throwJsonError = require("../errors/throw-json-error");

const isPasswordMatching = ( repeatedPassword, { req } ) => {
    if ( repeatedPassword !== req.body.password) {
        throwJsonError( 400, "Passwords do not match" );
    }
    return true;
}

module.exports = isPasswordMatching;