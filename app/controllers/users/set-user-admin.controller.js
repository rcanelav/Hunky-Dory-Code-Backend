const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { setAdmin } = require("../../repositories/users.repository");


const setUserAdmin = async( req, res = response) => {
    try {
        const { id } = req.params;
        const newAdmin = await setAdmin(id);
        if(!newAdmin) {
            throwJsonError( 500, "Error setting user admin")
        }
        res.status( 200 ).json({
            msg: "User admin set",
        });
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = { setUserAdmin };