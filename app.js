require('dotenv').config();
const Server = require('./app/models/Server');

const server = new Server();
server.listen();