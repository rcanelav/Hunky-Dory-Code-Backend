const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const { updateRole } = require("../../repositories/users.repository");


const updateUserRole = async( req, res = response) => {
    try {
        const { id } = req.auth;
        const { role } = req.body;
        const { technology } = req.body;
        const user = await updateRole( id, role, technology );
        if( !user ){
            throwJsonError( 500, 'Error updating role' );
        }
        res.status( 200 ).json({
            msg: "User role updated successfully.",
        });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = { updateUserRole };