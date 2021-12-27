const { response } = require("express");
const { getRedisCache } = require("../database/redis.database");
const createJsonError = require("../errors/create-json-error");




const redisCache = async(req, res = response, next) => {
    
    try {
        const resp = await getRedisCache(req.originalUrl);
        if ( resp ) return res.status(205).json({resp: JSON.parse(resp)});
        
        next();
    } catch (error) {
        createJsonError( error, res );
    }
};

module.exports = {
    redisCache,
};