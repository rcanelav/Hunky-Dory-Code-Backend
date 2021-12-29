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

async function setLike( answer_id, user_id ) {
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


module.exports = {
    findAnswerById,
    removeAnswerById,
    setLike,
    findAnswerLikeByUserId,
    removeAnswerLike,
};