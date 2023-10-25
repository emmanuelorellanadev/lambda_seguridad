const { request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const Role = require('../models/role_model');

const checkJWT = async(req = request, res, next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json( {
            msg: 'No token autentication recibed'
        })
    }
     
    try {
        //If the token was sended, take the user id (uid) of the token and search the user.        
        const userToken = jwt.verify(token, process.env.SECRETKEY);
        const userLoggedIn = await User.findByPk(userToken.uid);
        
        if ( !userLoggedIn ){
            return res.status(401).json({
                msg: 'User doesnt exist in DB'
            })
        }
        if ( !userLoggedIn.user_state ){
            return res.status(401).json({
                msg: 'user disabled'
            })
        }
        //get the role name of user
        const role = await Role.findByPk(userLoggedIn.RoleId);
        
        //check if role is active
        if( !role.role_state ){
            return res.status(401).json({
                msg: 'Role is not active'
            })
        }

        //save the userLoggedIn in to request to use it after
        req.userLoggedIn = userLoggedIn;
        req.userLoggedIn.role = role.role_name;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: 'Invalid token'})
    }

}

module.exports = {
    checkJWT
}
