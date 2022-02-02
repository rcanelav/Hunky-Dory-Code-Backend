"use strict";
const DBconnection = require("../database/config.database");
const createJsonError = require("../errors/create-json-error");
const throwJsonError = require("../errors/throw-json-error");

async function findPostById( id ) {
  const pool = await DBconnection();
  const sql = `
    SELECT posts.*, technologies.id as technologyId, technologies.name as technologyName, users.name as userName, users.lastname as userLastname, users.image as userImage, users.id as userId
    FROM posts
    LEFT JOIN users on posts.postedBy = users.id
    LEFT JOIN technologies ON posts.technology = technologies.id
    WHERE posts.id = ?
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

async function findPostAnswers( id, limit, offset ){
  const pool = await DBconnection();
  const sql = `
    SELECT answers.*, count(answers_likes.user_id) as totalLikes
    FROM answers
    left join answers_likes on answers.id = answers_likes.answer_id
    WHERE posts_id = ? GROUP BY answers.id
    ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
  const [answers] = await pool.query(sql, [id, limit, offset]);

  const sqlTotalAnswers = `
    SELECT COUNT(*) as totalAnswers FROM answers WHERE posts_id = ?
  `;
  const [totalAnswers] = await pool.query(sqlTotalAnswers, [id]);

  return {
    answers,
    totalAnswers: totalAnswers[0].totalAnswers
  };
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

async function findPostsBySearchType(type, q, offset, limit, order, direction ){
  try {
    const pool = await DBconnection();
    const sql = `SELECT posts.*,
    count(posts_likes.post_id) as likes,
    count(answers.posts_id) as numAnswers,
    users.name as userName,
    users.lastname as userLastname,
    users.image as userImage
    FROM posts
    LEFT JOIN posts_likes ON posts.id = posts_likes.post_id
    LEFT JOIN answers ON posts.id = answers.posts_id
    LEFT JOIN users on posts.postedBy = users.id
    WHERE posts.?? like ? GROUP BY posts.id ORDER BY ?? ${direction} LIMIT ? OFFSET ?`;
    const [posts] = await pool.query(sql, [`${type}`, `%${q}%`, `${order}`, limit, offset]);
    const sqlTotalPosts = `
    SELECT COUNT(*) AS totalPosts FROM posts WHERE ?? like ?`;
    const [totalPosts] = await pool.query(sqlTotalPosts, [`${type}`, `%${q}%`]);
    return {
      posts,
      totalPosts: totalPosts[0].totalPosts
    };
  } catch (error) {
    console.log(error);
  }
}

async function findPostByTechnology( value, technology, offset, limit, order, direction ){
  const pool = await DBconnection();
  const sql = `
    SELECT
    posts.*,
    count(posts_likes.post_id) as likes,
    count(answers.posts_id) as numAnswers,
    users.name as userName,
    users.lastname as userLastname,
    users.image as userImage
    FROM posts
    INNER JOIN technologies ON posts.technology = technologies.id
    LEFT JOIN posts_likes on posts.id = posts_likes.post_id
    LEFT JOIN answers ON posts.id = answers.posts_id
    LEFT JOIN users on posts.postedBy = users.id
    WHERE technologies.name = ? && posts.content like ? GROUP BY posts.id ORDER BY ?? ${ direction } LIMIT ? OFFSET ?`;
  const [posts] = await pool.query(sql, [technology, `%${value}%`, order, limit, offset]);

  const sqlTotalPosts = `
    SELECT COUNT(*) as totalPosts
    FROM posts
    INNER JOIN technologies ON posts.technology = technologies.id
    WHERE technologies.name LIKE ? && posts.content LIKE ?`;

  const [totalPosts] = await pool.query(sqlTotalPosts, [technology, `%${value}%`]);

  return {
    posts,
    totalPosts: totalPosts[0].totalPosts
  };
}

async function findPostsByDate ( value, initial = 0, end = new Date(), offset, limit, order, direction ) {
  const pool = await DBconnection();
  const sql = `
    SELECT posts.*,
    count(posts_likes.post_id) as likes,
    count(answers.posts_id) as numAnswers,
    users.name as userName,
    users.lastname as userLastname,
    users.image as userImage
    FROM posts
    LEFT JOIN posts_likes ON posts.id = posts_likes.post_id
    LEFT JOIN answers ON posts.id = answers.posts_id
    LEFT JOIN users on posts.postedBy = users.id
    WHERE posts.content like ? && postedAt BETWEEN ? AND ? + INTERVAL '1' DAY
    GROUP BY posts.id ORDER BY ?? ${direction} LIMIT ? OFFSET ?`;
  const [posts] = await pool.query(sql, [`%${value}%`, initial, end, order, limit, offset]);

  const sqlTotalPosts = `
    SELECT COUNT(*) as totalPosts
    FROM posts WHERE content like ? && postedAt BETWEEN ? AND ? + INTERVAL '1' DAY`;
  const [totalPosts] = await pool.query(sqlTotalPosts, [`%${value}%`, initial, end]);

  return {
    posts,
    totalPosts: totalPosts[0].totalPosts,
  };
}

async function findPostsByAnswersQuantity(value, numAnswers = 0, offset, limit, order, direction ) {
  const pool = await DBconnection();
  const sql = `
  SELECT posts.*,
  count(answers.posts_id) as numAnswers,
  count(posts_likes.post_id) as likes,
  users.name as userName,
  users.lastname as userLastname,
  users.image as userImage
  FROM posts
  LEFT JOIN answers ON posts.id = answers.posts_id
  LEFT JOIN posts_likes ON posts.id = posts_likes.post_id
  LEFT JOIN users on posts.postedBy = users.id
  WHERE posts.content LIKE ?
  GROUP BY posts.id HAVING numAnswers >= ? ORDER BY ?? ${ direction } LIMIT ? OFFSET ?`;
  const [posts] = await pool.query(sql, [`%${value}%`, numAnswers, order, limit, offset]);

  const sqlTotalPosts = `
  SELECT count(*), count(answers.posts_id) as numAnswers
  FROM posts
  LEFT JOIN answers ON posts.id = answers.posts_id
  WHERE posts.content LIKE ?
  GROUP BY posts.id HAVING numAnswers >= ?`;
  const [totalPosts] = await pool.query(sqlTotalPosts, [`%${value}%`, numAnswers]);

  return {
    posts,
    totalPosts: totalPosts.length,
  };
}

async function createNewPost( post ) {
  const pool = await DBconnection();
  const { title, content, technology, postedBy } = post;
  const sql = `
    INSERT INTO posts (title, content, technology, postedBy, postedAt)
    VALUES (?, ?, ?, ?, NOW())`;
  const [newPost] = await pool.query(sql, [title, content, technology, postedBy]);
  return true
}

async function removePostById( id ) {
  const pool = await DBconnection();
  const sql = `
    DELETE FROM posts WHERE id = ?`;
  const [post] = await pool.query(sql, [id]);
  return post.affectedRows;
}

module.exports = {
    findPostById,
    findPostLikeByUserId,
    findPostAnswers,
    removePostLike,
    setPostLike,
    findPostLikes,
    updatePost,
    findPosts,
    findPostsBySearchType,
    findPostByTechnology,
    findPostsByDate,
    findPostsByAnswersQuantity,
    createNewPost,
    removePostById,
};
