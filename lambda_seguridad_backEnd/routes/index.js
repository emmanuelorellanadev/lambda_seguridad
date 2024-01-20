const express = require('express');



const app = express();

module.exports = {
    lambdaRoutes: app.use('/auth', require('../routes/login_route'))

}