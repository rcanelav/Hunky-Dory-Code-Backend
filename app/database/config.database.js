'use strict';
const mysql = require('mysql2/promise');

const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_HOST_TEST,
    DATABASE_PORT_TEST,
    DATABASE_NAME_TEST,
    DATABASE_USER_TEST,
    DATABASE_PASSWORD_TEST,
    NODE_ENV,
} = process.env;

let pool;

async function DBconnection(){
    try {
        if (!pool) {
            pool =  mysql.createPool({
            host:     NODE_ENV === 'test' ? DATABASE_HOST_TEST : DATABASE_HOST,
            port:     NODE_ENV === 'test' ? DATABASE_PORT_TEST : DATABASE_PORT,
            database: NODE_ENV === 'test' ? DATABASE_NAME_TEST : DATABASE_NAME,
            user:     NODE_ENV === 'test' ? DATABASE_USER_TEST : DATABASE_USER,
            password: NODE_ENV === 'test' ? DATABASE_PASSWORD_TEST : DATABASE_PASSWORD,
            });
        }
        return pool;
    } catch (error) {
        console.log(error);
        throw new Error('DDBB connection failed.');
    }
}

module.exports = DBconnection;