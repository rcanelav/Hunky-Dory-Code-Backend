"use strict";
const DBconnection = require("../database/config.database");

async function findPostById( id ) {
  const pool = await DBconnection();
  const sql = `
    SELECT * FROM posts WHERE id = ?
  `;
  const [post] = await pool.query(sql, [id]);
  return post[0];
}

async function findPostLikeByUserId( post_id, user_id ) {
  const pool = await DBconnection();
  const sql = `
    SELECT * FROM posts_likes WHERE post_id = ? AND user_id = ?
  `;
  const [post] = await pool.query(sql, [post_id, user_id]);
  return post[0];
}

async function removePostLike( post_id, user_id ) {
  const pool = await DBconnection();
  const sql = `
    DELETE FROM posts_likes WHERE post_id = ? AND user_id = ?
  `;
  const [post] = await pool.query(sql, [post_id, user_id]);
  return post.affectedRows;
}

async function setPostLike( post_id, user_id ) {
    const pool = await DBconnection();
    const sql = `
      INSERT INTO posts_likes (post_id, user_id, date) VALUES (?, ?, NOW())
    `;
    const [post] = await pool.query( sql, [post_id, user_id] );
    return post.affectedRows;
  }

module.exports = {
    findPostById,
    findPostLikeByUserId,
    removePostLike,
    setPostLike,
};
