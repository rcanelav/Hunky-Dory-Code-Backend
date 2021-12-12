'use strict';

const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findUserById } = require("../../repositories/users.repository");

const getUserProfile = async (req, res) => {
    try {
      const { id } = req.params;
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
    getUserProfile
}