'use strict';
const mysql = require('mysql2/promise');

const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
} = process.env;

let pool;

async function DBconnection(){
    try {
        if (!pool) {
            pool =  mysql.createPool({
            host: DATABASE_HOST,
            port: DATABASE_PORT,
            database: DATABASE_NAME,
            user: DATABASE_USER,
            password: DATABASE_PASSWORD,
            });
        }
        return pool;
    } catch (error) {
        console.log(error);
        throw new Error('DDBB connection failed.');
    }
}

module.exports = DBconnection;