"use strict";

const { response, request } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findPostById, findPostLikes } = require("../../repositories/posts.repository");

const getPostById = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const post = await findPostById(id);
    if(!post){
        throwJsonError(404,"Post not found.");
    }
    const postLikes = await findPostLikes(id);
    const { content, postedAt, title, views, technologyId, technologyName, userImage, userName, userLastname, userId } = post;
    const responseData = {
      postData: {
        id,
        title,
        content,
        postedAt,
        views,
      },
      technology:{
        id: technologyId,
        name: technologyName
      },
      author: {
        id: userId,
        name: userName,
        lastname: userLastname,
        image: userImage,
      },
      likes : postLikes
    }

   res.status(200).json( responseData );
  } catch ( error ) {
    createJsonError( error, res );
  }
};

module.exports = {
  getPostById,
};
