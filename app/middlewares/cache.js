const getExpeditiusCache = require('express-expeditious');

const opt = {
    namespace: 'expresscache',
    defaultTtl: '10 minute',
    statusCodeExpires: {
        '404': '5 minute',
        '500': 0,
    }
}

const cacheData = getExpeditiusCache(opt);
module.exports = { cacheData };