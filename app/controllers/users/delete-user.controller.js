'use strict';

const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { removeUserById, setLastAuthUpdate } = require("../../repositories/users.repository");

const deleteUser = async(req, res = response) => {

    try {
        const { id } = req.params;
        const removedUser = await removeUserById( id );
        setLastAuthUpdate( id );
        
        if( !removedUser ) {
            throwJsonError( 404, "User not found" );
        }
        
        res.status( 200 ).json({
            msg: "User deleted successfully",
        });
    } catch (error) {
        createJsonError( res, error );
    }
};

module.exports = {
    deleteUser,
};