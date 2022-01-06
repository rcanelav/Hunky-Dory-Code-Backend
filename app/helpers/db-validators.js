const throwJsonError = require("../errors/throw-json-error");
const { findUserByEmail, findUserById } = require("../repositories/users.repository");
const { findAnswerById } = require("../repositories/answers.repository");
const { findPostById } = require("../repositories/posts.repository");
const { findTechnologyById, findTechnologyByName } = require("../repositories/technologies.repository");


const isExistingEmail = async( email = '' ) => {
    const emailExists = await findUserByEmail( email );
    if ( emailExists ){
        throwJsonError( 400, `Email: ${ email } already exists.` );
    }
};
const isExistingUserById = async( id ) => {
    const userExists = await findUserById( id);
    if ( !userExists ){
        throwJsonError( 400, `User with id: ${ id } does not exist.` );
    }
};

const isUserActive = async ( email ) => {
    const user = await findUserByEmail( email );
    if ( !user ){
        throwJsonError( 400, `User does not exist.` );
    }
    if ( !user.verifiedAt ){
        throwJsonError( 400, `User with email: ${ email } is not active.` );
    }
};

const isExistingAnswer = async( id ) => {
    const answer = await findAnswerById( id );
    if ( !answer ){
        throwJsonError( 400, `Answer with id: ${ id } does not exist.` );
    }
}

const isExistingPost = async( id ) => {
    const post = await findPostById( id );
    if ( !post ){
        throwJsonError( 400, `Post with id: ${ id } does not exist.` );
    }
}

const isExistingTechnology = async( technologyId ) => {
    const technology = await findTechnologyById( technologyId );
    if ( !technology ){
        throwJsonError( 400, `Technology with id: ${ technologyId } does not exist.` );
    }
}

const isExistingTechnologyByName = async( technologyName ) => {
    const technology = await findTechnologyByName( technologyName );
    if ( technology ){
        throwJsonError( 400, `Technology with name: ${ technologyName } already exists.` );
    }
}

module.exports = {
    isExistingEmail,
    isExistingUserById,
    isUserActive,
    isExistingAnswer,
    isExistingPost,
    isExistingTechnology,
    isExistingTechnologyByName,
};
