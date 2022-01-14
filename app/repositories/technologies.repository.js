"use strict";
const DBconnection = require("../database/config.database");

async function registerNewTechnology(name) {
    const pool = await DBconnection();
    const sql = `
        INSERT INTO technologies (name) VALUES (?)
    `;
    const [technology] = await pool.query(sql, [name]);
    return technology;
}

async function findTechnologyById(id) {
  const pool = await DBconnection();
  const sql = `
    SELECT * FROM technologies WHERE id = ?
  `;
  const [technology] = await pool.query(sql, [id]);
  return technology[0];
}

async function findTechnologies() {
    const pool = await DBconnection();
    const sql = `
        SELECT * FROM technologies
    `;
    const [technologies] = await pool.query(sql);
    return technologies;
}

async function findTechnologyByName(name) {
    const pool = await DBconnection();
    const sql = `
        SELECT * FROM technologies WHERE name = ?
    `;
    const [technology] = await pool.query(sql, [name]);
    return technology[0]?.name;
}

module.exports = {
    findTechnologyById,
    findTechnologies,
    findTechnologyByName,
    registerNewTechnology,
};
