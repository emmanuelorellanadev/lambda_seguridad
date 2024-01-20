//Middleware
//check if the user have the correct validation to make an action

const { GeneralError } = require('../errors_handler/errors');

const requiredRole = ( ...roles ) => {

    return (req, res, next)=>{

        if ( !req.userLoggedIn ) throw new GeneralError('Error: Esta intentando validar Role, sin haber verificado el token.');

        if ( !roles.includes( req.userLoggedIn.role )) throw new GeneralError('Error: El Role no es el requerido.');
       
        next();
    }
} 

module.exports = {
    requiredRole
}