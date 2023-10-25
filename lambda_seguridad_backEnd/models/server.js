const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('colors');

const db_connection = require('../database/conf_database');

//MAIN CLASS

class Server {

    constructor (){
        this.app = express();
        this.port = process.env.PORT;
        this.connectionDB();
        this.middlewares();
        this.routes();
    }

    listen(){
        this.app.listen(this.port, (req, res) => {
            console.log(`Server Online at http://localhost:${this.port}`.bgBlue);
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
        this.app.use('/company', require('../routes/company_route'))
        this.app.use('/branchType', require('../routes/branchType_route'));
        this.app.use('/branch',     require('../routes/branch_route'));
        this.app.use('/branchUser', require('../routes/branch_user_route'));
        this.app.use('/usersByBranch', require('../routes/users_by_branch_route'));
        this.app.use('/public', express.static('./data/img/public/'));//get folder data
    }

//DATABASE
    async connectionDB(){
        try {
            await db_connection.authenticate()
            console.log('Database connected'.bgBlue)
        } catch (error) {
            console.log('Error on connection with database, check database server'.bgRed);
            throw new Error(error);
        }
    }
}

module.exports = Server;