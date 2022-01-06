const { response } = require("express");
const createJsonError = require("../errors/create-json-error");
const throwJsonError = require("../errors/throw-json-error");
const { findPostById } = require("../repositories/posts.repository");
const { findUserById } = require("../repositories/users.repository");



const postAuthorshipValidator = async(req, res = response, next) => {
    
    try {
        const { id } = req.auth;
        const { id: postId } = req.params;
        const post = await findPostById(postId);
        const user = await findUserById(id);
        const { role } = user;

        if ( !post ) {
            throwJsonError(404, "Post not found");
        }
        const { postedBy } = post;
        
        if ( postedBy !== id && role !== "ADMIN" ) {
            throwJsonError(403, "You are not allowed to manage this post");
        }

        next();
    } catch (error) {
        createJsonError( error, res );
    }
};

module.exports = {
    postAuthorshipValidator,
};