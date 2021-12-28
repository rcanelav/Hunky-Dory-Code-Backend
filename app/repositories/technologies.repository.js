"use strict";
const DBconnection = require("../database/config.database");

async function findTechnologyIdByName(name) {
  const pool = await DBconnection();
  const sql = `
    select id from technologies where name=?`;
  const [tech] = await pool.query(sql, name);
  return tech[0];
}

module.exports = {
  findTechnologyIdByName,
};
