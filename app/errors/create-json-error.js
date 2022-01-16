'use strict';

function createJsonError( error, res ) {
    const { status, message} = error;
    res.status( status || 500 ).json( {
        errors : [
            {
                msg: message
            }
        ],
    } );
}

module.exports = createJsonError;