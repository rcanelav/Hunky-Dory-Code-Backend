const { response } = require("express");
const createJsonError = require("../errors/create-json-error");
const throwJsonError = require("../errors/throw-json-error");
const { findPostById } = require("../repositories/posts.repository");
const { findTechnologyById } = require("../repositories/technologies.repository");
const { findUserById } = require("../repositories/users.repository");

const replyValidator = async(req, res = response, next) => {
    try {
        const { id, role} = req.auth;
        const { id: post_id } = req.params;

        const post = await findPostById(post_id);
        if ( !post ) {
            throwJsonError(404, "Answer not found");
        }
        const { postedBy, technology: postCategory } = post;
        const { technologies: userTechnology } = await findUserById(id);
        const {name: categoryName} = await findTechnologyById(postCategory);

        if( postedBy !== id && !role.includes("ADMIN") && !role.includes("EXPERT")) {
            throwJsonError(403, "Only experts can reply to posts.");
        }
        if( postedBy !== id && postCategory !== userTechnology && !role.includes("ADMIN") ) {
            throwJsonError(403, `You are not allowed to reply to posts in ${categoryName} category.`);
        }
        next();
    } catch (error) {
        createJsonError( error, res );
    }
};

module.exports = {
    replyValidator,
};
