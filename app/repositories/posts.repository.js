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

async function findPostLikes( id ) {
    const pool = await DBconnection();
    const sql = `
        SELECT * FROM posts_likes WHERE post_id = ?
    `;
    const [postLikes] = await pool.query( sql, [id] );

    const sql2 = `
        SELECT COUNT(*) AS totalLikes FROM posts_likes WHERE post_id = ?`;
    const [totalLikes] = await pool.query( sql2, [id] );

    return { totalLikes: totalLikes[0].totalLikes, postLikes };
}

async function updatePost(post) {
  const pool = await DBconnection();
  const { title, content, id } = post;
  const sql = `
    UPDATE posts SET title = ?, content = ? WHERE id = ?`;
  const [updatedPost] = await pool.query(sql, [title, content, id]);
  return updatedPost.affectedRows;
}

async function findPosts( limit, offset ){
  const pool = await DBconnection();
  const sql = `
  SELECT * from posts LIMIT ? OFFSET ?`;
  const [posts] = await pool.query(sql, [offset, limit]);

  const sqlTotalPosts = `
  SELECT COUNT(*) AS totalPosts FROM posts`;
  const [totalPosts] = await pool.query(sqlTotalPosts);

  return {
    posts,
    totalPosts: totalPosts[0].totalPosts
  }
}

module.exports = {
    findPostById,
    findPostLikeByUserId,
    removePostLike,
    setPostLike,
    findPostLikes,
    updatePost,
    findPosts,
};
