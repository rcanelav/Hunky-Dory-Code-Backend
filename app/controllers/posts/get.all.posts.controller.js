"use strict";

const { response, request } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findAllPosts } = require("../../repositories/posts.repository");

const getAllPosts = async (req = request, res = response) => {
  try {
    const posts = await findAllPosts();
    if (!posts) {
      throwJsonError(400, "No posts available");
    }
    res.status(201).json({ posts });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = {
  getAllPosts,
};
