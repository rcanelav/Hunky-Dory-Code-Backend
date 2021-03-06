"use strict";
const DBconnection = require("../database/config.database");

async function findAnswerById( id ) {
  const pool = await DBconnection();
  const sql = `
    SELECT * FROM answers WHERE id = ?
  `;
  const [answer] = await pool.query( sql, [id] );
  return answer[0];
}

async function removeAnswerById( id ) {
  const pool = await DBconnection();
  const sql = `
    DELETE FROM answers WHERE id = ?
  `;
  const [deletedAnswer] = await pool.query(sql, [id]);
  return deletedAnswer.affectedRows;
}

async function findAnswerLikeByUserId( answer_id, user_id ) {
  const pool = await DBconnection();
  const sql = `
    SELECT * FROM answers_likes WHERE answer_id = ? AND user_id = ?
  `;
  const [answer] = await pool.query( sql, [answer_id, user_id] );
  return answer[0];
}

async function setAnswerLike( answer_id, user_id ) {
  const pool = await DBconnection();
  const sql = `
    INSERT INTO answers_likes (answer_id, user_id, date) VALUES (?, ?, NOW())
  `;
  const [answer] = await pool.query( sql, [answer_id, user_id] );
  return answer.affectedRows;
}

async function removeAnswerLike( answer_id, user_id ) {
  const pool = await DBconnection();
  const sql = `
    DELETE FROM answers_likes WHERE answer_id = ? AND user_id = ?
  `;
  const [answer] = await pool.query( sql, [answer_id, user_id] );
  return answer.affectedRows;
}

async function findAnswerLikes( id ) {
  const pool = await DBconnection();
  const sql = `
    SELECT * FROM answers_likes WHERE answer_id = ?
  `;
  const [answerLikes] = await pool.query( sql, [id] );

  const sql2 = `
    SELECT COUNT(*) AS totalLikes FROM answers_likes WHERE answer_id = ?`;
  const [totalLikes] = await pool.query( sql2, [id] );

  return { totalLikes: totalLikes[0].totalLikes, answerLikes };
}

async function createNewAnswer( answer ) {
  const pool = await DBconnection();
  const sql = `
    INSERT INTO answers (content, postedBy, posts_id, createdAt) VALUES (?, ?, ?, NOW())
  `;
  const [answerId] = await pool.query( sql, [answer.content, answer.postedBy, answer.posts_id] );
  return answerId.insertId;
}

module.exports = {
    findAnswerById,
    removeAnswerById,
    setAnswerLike,
    findAnswerLikeByUserId,
    removeAnswerLike,
    findAnswerLikes,
    createNewAnswer,
};
