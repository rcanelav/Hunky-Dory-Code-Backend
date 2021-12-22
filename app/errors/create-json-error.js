'use strict';

function createJsonError( error, res ) {
    const { status, message} = error;
    res.status( status || 500 ).json( {
        error: message,
    } );
}

module.exports = createJsonError;