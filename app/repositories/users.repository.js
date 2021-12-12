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
    const { name, lastname, email, passwordHash, verificationCode, role } = user;
    const now = new Date();
    const [created] = await pool.query(sql, [
      name, lastname, email, passwordHash, verificationCode, role, now
    ]);

    return created.insertId;
}

async function createUserByGoogleAuth(user) {
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
      name, lastname, email, passwordHash, verificationCode, now, image
    ]);

    return created.insertId;
}

async function findUserByEmail( email ){
    const pool = await DBconnection();
    const sql = 'select id, name, lastname, email, role, password, verifiedAt from users where email = ?';
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

async function findUserById(id) {
  const pool = await DBconnection();
  const sql = 'SELECT name, email, image, role, password, createdAt, verifiedAt, lastAuthUpdate FROM users WHERE id = ?';
  const [user] = await pool.query(sql, id);

  return user[0];
}

async function updateUser( user ){
  const { id, name, lastname, email, password } = user;
  const now = new Date();
  const pool = await DBconnection();
  const sql = `
    UPDATE users
    SET name = ?, lastname = ?, email = ?, password = ?, updatedAt = ?
    WHERE id = ?
  `;
  await pool.query(sql, [name, lastname, email, password, now, id]);

  return true;
}

async function updateVerificationCode(id, verificationCode){
  const pool = await DBconnection();
  const now = new Date();
  const sql = `
    UPDATE users set verificationCode = ?, updatedAt = ?, verifiedAt = NULL where id = ?`;
  const [users] = await pool.query(sql, [verificationCode, now, id]);
  return true;
}

async function setLastAuthUpdate( id ){
  const pool = await DBconnection();
  const now = new Date();
  const sql = `
    UPDATE users set lastAuthUpdate = ? where id = ?`;
  const [users] = await pool.query(sql, [now, id]);
  return true;
}

async function getLastUpdate( id ){
  const pool = await DBconnection();
  const sql = `
    SELECT lastAuthUpdate FROM users where id = ?`;
  const [users] = await pool.query(sql, id);
  return users[0].lastAuthUpdate;
}

module.exports = {
    findUserByEmail,
    createUser,
    activateUser,
    getUserByVerificationCode,
    findUserById,
    createUserByGoogleAuth,
    updateUser,
    updateVerificationCode,
    setLastAuthUpdate,
    getLastUpdate,
};

