"use strict";

const { response, request } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findPosts } = require("../../repositories/posts.repository");

const getPosts = async (req = request, res = response) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    if( page < 1 ){
        throwJsonError(404, "Page not found.");
    }

    const { posts, totalPosts } = await findPosts( startIndex, limit );
    const data = {};
    data.totalPages = Math.ceil( totalPosts / limit );

    if( startIndex ){
        data.previous = {
            page: page - 1,
            limit,
        };
    }
    if( page < data.totalPages ){
        data.next = {
            page: page + 1,
            limit,
        };
    }
    data.results = posts;

    res.status(200).json( data );
  } catch ( error ) {
    createJsonError( error, res );
  }
};

module.exports = {
  getPosts,
};
