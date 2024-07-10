//LAMBDA SERVER

const express   =   require('express');
const cors      =   require('cors');
                    require('dotenv').config();
                    require('colors');

const db_connection = require('../database/conf_database');
const { errorsHandler } = require('../errors_handler/errorsHandler');

//MAIN CLASS

class Server {
    constructor (){
        this.app = express();
        this.port = process.env.PORT;
        this.connectionDB();
        this.middlewares();
        this.routes();
        this.errors();
    }

    listen(){
        this.app.listen(this.port, (req, res) => {
            console.log(`Server Online at http://localhost:${this.port}`.bgBlue);
        });
    }

//MIDDLEWARES
    middlewares(){

        this.app.use(express.json());
        this.app.use(cors({ 
            "Access-Control-Allow-Origin" : "*" 
        }));
    }

//ROUTES
    routes(){
        this.app.use('/auth',               require('../routes/login_route'));
        this.app.use('/branch',             require('../routes/branch_route'));
        this.app.use('/branchUser',         require('../routes/branch_user_route'));
        this.app.use('/branchType',         require('../routes/branchType_route'));
        this.app.use('/company',            require('../routes/company_route'));
        this.app.use('/log',                require('../routes/log_route')); //what's this?
        this.app.use('/payment',            require('../routes/payment_route'));
        this.app.use('/paymentState',       require('../routes/paymentState_route'));
        this.app.use('/paymentDetail',      require('../routes/paymentDetail_route'));
        this.app.use('/person',             require('../routes/person_route'));
        this.app.use('/personType',         require('../routes/personType_route'));
        this.app.use('/public',             express.static('./data/img/public/'));//get folder data
        this.app.use('/reservation',        require('../routes/reservation_route'));
        this.app.use('/reservationDetail',  require('../routes/reservationDetail_route'));
        this.app.use('/reservationState',   require('../routes/reservationState_route'));
        this.app.use('/role',               require('../routes/role_route'));
        this.app.use('/room',               require('../routes/room_route'));
        this.app.use('/roomState',          require('../routes/roomState_route'));
        this.app.use('/service',            require('../routes/service_route'));
        this.app.use('/user',               require('../routes/user_route'));
        this.app.use('/usersByBranch',      require('../routes/users_by_branch_route'));
        this.app.use('/*',                  require('../routes/error_route'));
            
    }
    
    errors(){
        this.app.use( (error, req, res, next) => {
           errorsHandler(error, res)
        })

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