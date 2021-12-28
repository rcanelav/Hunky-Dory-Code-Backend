"use strict";

const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findPostById } = require("../../repositories/posts.repository");

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await findPostById(id);
    if (!post) {
      throwJsonError(404, "Post not found");
    }

    res.status(200).json({ post });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = {
  getPostById,
};
