"use strict";
const DBconnection = require("../database/config.database");

async function createUser(user) {
  const pool = await DBconnection();
  const sql = `
      INSERT INTO users(
        name, lastname, email, password, verificationCode, role,
        createdAt, image
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const { name, lastname, email, passwordHash, verificationCode, role, image } = user;
  const now = new Date();
  const [created] = await pool.query(sql, [
    name,
    lastname,
    email,
    passwordHash,
    verificationCode,
    role,
    now,
    image
  ]);

  return created.insertId;
}

async function findUsers( offset, limit){
  const pool = await DBconnection();
  const sql = `
    SELECT id, name, lastname, email, role, image, technologies, createdAt, verifiedAt FROM users LIMIT ? OFFSET ?`;
  const [users] = await pool.query(sql, [limit, offset]);

  const sqlTotalUsers = `
    SELECT COUNT(*) AS totalUsers FROM users`;
  const [totalUsers] = await pool.query(sqlTotalUsers);

  return {
    users,
    totalUsers: totalUsers[0].totalUsers,
  };
}

async function createUserByFirebaseAuth(user) {
  const pool = await DBconnection();
  const sql = `
      INSERT INTO users(
        name, lastname, email, password, verificationCode,
        createdAt, google, image
      ) VALUES (?, ?, ?, ?, ?, ?, 1, ?)
    `;
  const { name, lastname, email, passwordHash, verificationCode, image } = user;
  const now = new Date();
  const [created] = await pool.query(sql, [
    name,
    lastname,
    email,
    passwordHash,
    verificationCode,
    now,
    image,
  ]);

  return created.insertId;
}

async function findUserByEmail(email) {
  const pool = await DBconnection();
  const sql =
    "select id, name, lastname, email, role, password, verifiedAt from users where email = ?";
  const [user] = await pool.query(sql, email);

  return user[0];
}

async function activateUser(verificationCode) {
  const now = new Date();
  const pool = await DBconnection();
  const sql = `
    UPDATE users
    SET verifiedAt = ?
    WHERE verificationCode = ?
    AND verifiedAt IS NULL
  `;
  const [result] = await pool.query(sql, [now, verificationCode]);

  return result.affectedRows === 1;
}

async function getUserByVerificationCode(code) {
  const pool = await DBconnection();
  const sql = `
    SELECT name, email
    FROM users WHERE verificationCode = ?
  `;
  const [user] = await pool.query(sql, code);

  return user[0];
}

async function findUserById(id) {
  const pool = await DBconnection();
  const sql =`
    SELECT users.id, users.name, users.lastname, users.email, users.image, users.role, users.password, users.createdAt, users.verifiedAt, users.lastAuthUpdate, users.technologies, users.linkedin, technologies.name as technologyName
    FROM users 
    left join technologies on users.technologies = technologies.id
    WHERE users.id = ?
  `;
  const [user] = await pool.query(sql, id);

  return user[0];
}

async function updateUser(user) {
  const { id, name, lastname, email, password } = user;
  const now = new Date();
  const pool = await DBconnection();
  if(password){
    const sql = `
    UPDATE users
    SET name = ?, lastname = ?, email = ?, password = ?, updatedAt = ?
    WHERE id = ?
  `;
    await pool.query(sql, [name, lastname, email, password, now, id]);
  }else{
    const sql = `
    UPDATE users
    SET name = ?, lastname = ?, email = ?, updatedAt = ?
    WHERE id = ?
  `;
    await pool.query(sql, [name, lastname, email, now, id]);
  }

  return true;
}

async function updateRole( id, role, technology = null ) {
  const pool = await DBconnection();
  const sql = `
    UPDATE users set role = ?, technologies = ? where id = ?`;
  const [users] = await pool.query(sql, [role, !technology ? null : technology, id]);
  return true;
}

async function setAdmin(id) {
  const pool = await DBconnection();
  const sql = `
    UPDATE users set role = 'admin' where id = ?`;
  const [users] = await pool.query(sql, id);
  return users.affectedRows === 1;
}

async function updateVerificationCode(id, verificationCode) {
  const pool = await DBconnection();
  const now = new Date();
  const sql = `
    UPDATE users set verificationCode = ?, updatedAt = ?, verifiedAt = NULL where id = ?`;
  const [users] = await pool.query(sql, [verificationCode, now, id]);
  return true;
}

async function setLastAuthUpdate(id) {
  const pool = await DBconnection();
  const now = new Date();
  const sql = `
    UPDATE users set lastAuthUpdate = ? where id = ?`;
  const [users] = await pool.query(sql, [now, id]);
  return true;
}

async function getLastUpdate(id) {
  const pool = await DBconnection();
  const sql = `
    SELECT lastAuthUpdate FROM users where id = ?`;
  const [users] = await pool.query(sql, id);
  return users[0].lastAuthUpdate;
}

async function setUserImage( id, imgUrl ) {
  const pool = await DBconnection();
  const sql = `
    UPDATE users set image = ? where id = ?`;
  const [users] = await pool.query(sql, [imgUrl, id]);
  return true;
}

async function removeUserById(id) {
  const pool = await DBconnection();
  const sql = `
    UPDATE users set verifiedAt = NULL, createdAt = NULL  where id = ?`;
  const [users] = await pool.query(sql, id);
  return true;
}

async function findUserAnswers(id, initial, limit) {
  const pool = await DBconnection();
  const sql = `
  SELECT posts.*, answers.*, users.name, users.lastname, users.image, count(posts_likes.id)postLikes, count(answers_likes.id)answerLikes FROM (
    SELECT id answerId, answers.content answerContent, answers.createdAt answerCreatedAt, posts_id FROM answers WHERE postedBy = ?
    ORDER BY createdAt DESC
  ) as answers
  LEFT JOIN posts ON answers.posts_id = posts.id
  LEFT JOIN users ON posts.postedBy = users.id
  LEFT JOIN posts_likes ON posts.id = posts_likes.post_id
  LEFT JOIN answers_likes ON answers.answerId = answers_likes.answer_id
  GROUP BY answerId
  LIMIT ? OFFSET ?
  `;
  let [answers] = await pool.query(sql, [id, limit, initial]);

  const sqlNumAnswers = `
  SELECT count(id) as total FROM answers WHERE posts_id = ?
  `;

  answers.map(async answer => {
    const [total] = await pool.query(sqlNumAnswers, answer.posts_id);
    answer.numAnswers = total[0].total;
  });

  const sqlTotalUserAnswers = `
    SELECT COUNT(id) as totalAnswers FROM answers WHERE postedBy = ?`;
  const [totalAnswers] = await pool.query(sqlTotalUserAnswers, id);  
  
  return {
    answers,
    totalAnswers: totalAnswers[0].totalAnswers,
  };
}

async function findUserPosts(id, initial, limit) {
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
  WHERE posts.postedBy like ? GROUP BY posts.id LIMIT ? OFFSET ?
  `;
  const [posts] = await pool.query(sql, [id, limit, initial]);
  
  const sqlTotalUserPosts = `
    SELECT COUNT(id) as totalPosts FROM posts WHERE postedBy = ?`;
  const [totalPosts] = await pool.query(sqlTotalUserPosts, id);  
  
  return {posts,
          totalPosts: totalPosts[0].totalPosts};
}

async function findPublicationLikesGivenByUser( id, offset, limit ) {
  const pool = await DBconnection();
  const sqlPublicationLikes = `
    select *, 'post' as type from posts_likes where user_id = ?
    union all
    select *, 'answer' as type from answers_likes
    where user_id = ? LIMIT ? OFFSET ?`;

  const [likedPublications] = await pool.query(sqlPublicationLikes, [id, id, limit, offset]);
  const sqlTotalPublicationsLikes = `
    select count(*) as totalLikedPublications from
    (
      select id, post_id, user_id, date from posts_likes where user_id = ?
      union all
      select id, answer_id, user_id, date from answers_likes
      where user_id = ?
    ) likes`;

  const [totalLikedPublications] = await pool.query(sqlTotalPublicationsLikes, [id, id]);
  return {
    likedPublications,
    totalLikedPublications: totalLikedPublications[0].totalLikedPublications
  };
}

async function findUserRating(id) {
  const pool = await DBconnection();
  const sql = `
  SELECT
    (select count(*) from posts
                inner join posts_likes on posts.id = posts_likes.post_id where posts.postedBy = ?) + 
    (select count(*) from answers
                inner join answers_likes on answers.id = answers_likes.answer_id where answers.postedBy = ?) as userRating
  `;
  const [rating] = await pool.query(sql, [id, id]);
  return rating[0].userRating;
}

module.exports = {
  findUserByEmail,
  createUser,
  activateUser,
  getUserByVerificationCode,
  findUserById,
  createUserByFirebaseAuth,
  updateUser,
  updateVerificationCode,
  setLastAuthUpdate,
  getLastUpdate,
  findUsers,
  setUserImage,
  updateRole,
  removeUserById,
  findUserAnswers,
  findUserPosts,
  findPublicationLikesGivenByUser,
  findUserRating,
  setAdmin,
};
