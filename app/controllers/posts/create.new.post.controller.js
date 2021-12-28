const { createNewPostDB } = require("../../repositories/posts.repository");
const { response, request } = require("express");
const createJsonError = require("../../errors/create-json-error");
const { isTechnologyExistingByName } = require("../../helpers/db-validators");

async function createNewPost(req = request, res = response) {
  try {
    const { body } = req;
    const { title, content, tech } = body;
    //const { id } = req.auth;
    //const postedBy = id;

    postedBy = 1;
    const technology = await isTechnologyExistingByName(tech);

    const post = {
      title,
      content,
      technology,
      postedBy,
    };

    const postId = await createNewPostDB(post);

    res.status(201).json({
      id: postId,
      msg: "Post created successfully",
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = { createNewPost };
