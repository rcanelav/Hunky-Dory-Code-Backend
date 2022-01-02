const { updatePost } = require("../../repositories/posts.repository");
const { response, request } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");

async function updatePostById(req = request, res = response) {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const post = {
      title,
      content,
      id,
    };

    const postUpdated = await updatePost(post);
    if (!postUpdated) {
      throwJsonError(400, "Post could not be updated");
    }

    res.status(201).json({
      msg: "Post updated successfully",
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = { updatePostById };
