const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('colors');

const db_connection = require('../database/conf_database');

//MAIN CLASS

class Server {

    constructor(){
        this.app = express();
        this.connectionDB();
        this.middlewares();
        this.routes();
    }

    listen(){
        this.app.listen(process.env.PORT, (req, res) => {
            console.log('Server Online'.bgBlue);
        });
    }

//MIDDLEWARES
    middlewares(){
        this.app.use(express.json());

        //handles transactions whith client 
        // this.app.use(cors({
        //     origin: '*',
        //     methods: ['GET', 'POST', 'PUT'],
        //     // allowedHeaders: ['Content-Type', 'Authorization']
        // }));
        this.app.use(cors({ 
            "Access-Control-Allow-Origin" : "*" 
        }));
    }
//ROUTES
    routes(){
        this.app.use('/auth', require('../routes/login_route'));
        this.app.use('/role', require('../routes/role_route'));
        this.app.use('/user', require('../routes/user_route'));
    }

//DATABASE
    async connectionDB(){
        try {
            await db_connection.authenticate()
            console.log('database connected'.bgBlue)
        } catch (error) {
            console.log('Error on connection with database'.bgRed);
            throw Error(error);
        }
    }
}

module.exports = Server;