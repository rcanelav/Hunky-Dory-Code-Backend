'use strict';

function createJsonError( error, res ) {
    const { status, message} = error;
    res.status( status ).json( {
        error: message,
    } );
}

module.exports = createJsonError;