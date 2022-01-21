'use strict';

const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findUserById } = require("../../repositories/users.repository");

const getselfProfile = async (req, res) => {
    try {
      const { id } = req.auth;
      const user = await findUserById(id);
      if(!user){
         throwJsonError( 404, "User not found" );
      }
      const { password, ...userData } = user;
      
      res.status( 200 ).json( { userData } );
    } catch (error) {
      createJsonError(error, res);
    }
}

module.exports = {
    getselfProfile
}