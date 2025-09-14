//LAMBDA SERVER

const express   =   require('express');
const cors      =   require('cors');
const helmet    =   require('helmet');
const rateLimit =   require('express-rate-limit');
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
        // Security headers
        this.app.use(helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    scriptSrc: ["'self'"],
                    imgSrc: ["'self'", "data:"],
                    fontSrc: ["'self'"]
                }
            },
            hsts: {
                maxAge: 31536000,
                includeSubDomains: true,
                preload: true
            }
        }));

        this.app.use(express.json({ limit: '10mb' })); // Add size limit for security
        
        // Rate limiting for auth endpoints
        const authLimiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 5, // limit each IP to 5 requests per windowMs
            message: {
                error: 'Too many authentication attempts, please try again later.',
                code: 'RATE_LIMIT_EXCEEDED'
            },
            standardHeaders: true,
            legacyHeaders: false
        });
        
        // General rate limiting
        const generalLimiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100, // limit each IP to 100 requests per windowMs
            message: {
                error: 'Too many requests, please try again later.',
                code: 'RATE_LIMIT_EXCEEDED'
            }
        });
        
        this.app.use(generalLimiter);
        
        // Apply auth rate limiting before setting up auth routes
        this.authLimiter = authLimiter;
        
        // Improved CORS configuration for security
        this.app.use(cors({
            origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5173'],
            credentials: true,
            optionsSuccessStatus: 200,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'x-token']
        }));
    }

//ROUTES
    routes(){ 
        // Apply rate limiting to auth routes specifically
        this.app.use('/auth',               this.authLimiter, require('../routes/auth_route'));
        this.app.use('/changePassword',     this.authLimiter, require('../routes/changePassword_route'));
        
        // Other routes without specific rate limiting (general limiter still applies)
        this.app.use('/branch',             require('../routes/branch_route'));
        this.app.use('/branchType',         require('../routes/branchType_route'));
        this.app.use('/company',            require('../routes/company_route'));
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
        this.app.use('/room-service',       require('../routes/room_service_route'));
        this.app.use('/roomPrice',          require('../routes/roomPrice_route'));
        this.app.use('/roomPrice-room',     require('../routes/roomPrice_room_route'));
        this.app.use('/roomState',          require('../routes/roomState_route'));
        this.app.use('/service',            require('../routes/service_route'));
        this.app.use('/user',               require('../routes/user_route'));
        this.app.use('/usersByBranch',      require('../routes/users_by_branch_route'));
        // this.app.use('/*',                  require('../routes/error_route'));
            
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