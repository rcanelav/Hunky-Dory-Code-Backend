"use strict";
const DBconnection = require("../database/config.database");

async function createNewPostDB(post) {
  const pool = await DBconnection();
  const sql = `
  INSERT INTO posts(
    title, content, views, technology, postedBy,postedAt
  ) VALUES (?, ?, ?, ?, ?, ?)
`;
  const { title, content, technology, postedBy } = post;
  const views = 0;
  const postedAt = new Date();
  const [created] = await pool.query(sql, [
    title,
    content,
    views,
    technology,
    postedBy,
    postedAt,
  ]);
  return created.insertId;
}

async function findAllPosts() {
  const pool = await DBconnection();
  const sql = `
    SELECT * FROM posts`;
  const [posts] = await pool.query(sql);
  return posts;
}

async function findPostById(id) {
  const pool = await DBconnection();
  const sql = "SELECT * FROM posts WHERE id = ?";
  const [post] = await pool.query(sql, id);

  return post[0];
}

module.exports = {
  createNewPostDB,
  findAllPosts,
  findPostById,
};
