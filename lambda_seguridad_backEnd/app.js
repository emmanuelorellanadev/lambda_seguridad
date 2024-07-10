//lambda security 0.1.0

const Server = require('./server/server');


const server_lambda = new Server();

server_lambda.listen();