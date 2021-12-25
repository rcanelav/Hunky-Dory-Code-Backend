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

module.exports = {
    findAnswerById,
    removeAnswerById,
};