
// Middleware para validar JWT y asegurar que el usuario y su rol estén activos.
// Si el token es válido, agrega el usuario autenticado al request.
const { request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const Role = require('../models/role_model');
const { LoginError } = require('../errors_handler/errors');
const { errorsHandler } = require('../errors_handler/errorsHandler');


const checkJWT = async(req = request, res, next) => {
    // Se recomienda migrar este try/catch a un wrapper asíncrono (catchedAsync)
    try {
        // Verifica que el header x-token exista
        if( !req.header('x-token') ) throw new LoginError('Token no recibido', 400)
        // Obtiene el token del header
        const token = req.header('x-token');
        // Verifica y decodifica el token usando la clave secreta
        const userToken = await jwt.verify(token, process.env.SECRETKEY);
        // Busca el usuario por uid del token
        const userLoggedIn = await User.findByPk(userToken.uid);
        // Si el usuario no existe o está deshabilitado, lanza error
        if ( !userLoggedIn ) throw new LoginError('Usuario no encontrado en la BD', 404)
        if ( !userLoggedIn.user_state ) throw new LoginError('Usuario desabilitado', 401)
        // Obtiene el rol del usuario
        const role = await Role.findByPk(userLoggedIn.RoleId);
        // Verifica que el rol esté activo
        if( !role.role_state )throw new LoginError('Rol sin permisos', 401)
        // Agrega el usuario autenticado y su rol al request
        req.userLoggedIn = userLoggedIn;
        req.userLoggedIn.role = role.role_name;
        req.role = role.role_name;
        next();
    } catch (error) {
        // Manejo centralizado de errores
        errorsHandler(error, res)
    }
}

// Exporta el middleware para su uso en rutas protegidas
module.exports = {
    checkJWT
}
