require('dotenv').config();
const Server = require('./app/models/Server');

const server = new Server();
const sv = server.listen();



const app = server.app;
module.exports = {
    app,
    server,
    sv
};