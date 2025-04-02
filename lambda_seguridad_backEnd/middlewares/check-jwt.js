const { request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const Role = require('../models/role_model');
const { LoginError } = require('../errors_handler/errors');
const { errorsHandler } = require('../errors_handler/errorsHandler');

const checkJWT = async(req = request, res, next) => {
   

// WORK HERE !!!
//change trycatch by errors_handler/catchedAsync


    try {
        if( !req.header('x-token') ) throw new LoginError('Token no recibido', 400)
        
            const token = req.header('x-token');

        //If the token was sended, take the user id (uid) of the token and search the user.        
        const userToken = await jwt.verify(token, process.env.SECRETKEY);
        const userLoggedIn = await User.findByPk(userToken.uid);
        
        if ( !userLoggedIn ) throw new LoginError('Usuario no encontrado en la BD', 404)
        if ( !userLoggedIn.user_state ) throw new LoginError('Usuario desabilitado', 401)

        //get the role name of user
        const role = await Role.findByPk(userLoggedIn.RoleId);
        
        //check if role is active
        if( !role.role_state )throw new LoginError('Rol sin permisos', 401)

        //save the userLoggedIn in to request to use it after
        req.userLoggedIn = userLoggedIn;
        req.userLoggedIn.role = role.role_name;
        req.role = role.role_name;
        next();
    } catch (error) {
        errorsHandler(error, res)
    }
}

module.exports = {
    checkJWT
}
