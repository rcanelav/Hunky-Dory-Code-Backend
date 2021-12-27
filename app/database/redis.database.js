// const redis = require('redis');
const asyncRedis = require('async-redis');
const { REDIS_HOSTNAME, REDIS_PORT, REDIS_PASSWORD } = process.env;
const { promisify } = require('util');


const client = asyncRedis.createClient({
    host: REDIS_HOSTNAME,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
});

client.on('error', (err) => console.log('Redis Client Error', err));

const getRedisCache = async ( data ) => {
    return client.get(data);
}
const setRedisCache = async ( key, value ) => {
    client.set(key, value);
}

module.exports = {
    getRedisCache,
    setRedisCache,
};