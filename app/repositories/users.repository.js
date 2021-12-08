'use strict';
const DBconnection = require("../database/config.database");

async function createUser(user) {
    const pool = await DBconnection();
    const sql = `
      INSERT INTO users(
        name, lastname, email, password, verificationCode, role,
        createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const { name, lastname, email, passwordHash, verificationCode } = user;
    const now = new Date();
    const [created] = await pool.query(sql, [
      name, lastname, email, passwordHash, verificationCode, 1, now
    ]);

    return created.insertId;
}

async function findUserByEmail( email ){
    const pool = await DBconnection();
    const sql = ' select id, name, email, role, password, verifiedAt from users where email = ?';
    const [user] = await pool.query(sql, email);

    return user[0];
}

async function activateUser(verificationCode) {
  const now = new Date();
  const pool = await DBconnection();
  const sql = `
    UPDATE users
    SET verifiedAt = ?, status = 'ACTIVE'
    WHERE verificationCode = ?
    AND verifiedAt IS NULL
  `;
  const [result] = await pool.query(sql, [now,  verificationCode]);

  return (result.affectedRows === 1);
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

module.exports = {
    findUserByEmail,
    createUser,
    activateUser,
    getUserByVerificationCode,

};

