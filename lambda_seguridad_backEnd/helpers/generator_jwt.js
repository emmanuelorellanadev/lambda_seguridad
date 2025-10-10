
// Utilidad para generar JWT con datos mínimos necesarios y expiración controlada.
const jwt = require('jsonwebtoken');

// Genera un JWT con uid, rol, nombre y sucursal, usando la clave secreta y expiración de 12h.
// No incluir información sensible en el payload.
const generatorJWT = ( uid, role, name, branchId, branch ) => {
    return new Promise ( (resolve, reject) => {
        const payload = { uid, role, name, branchId, branch }; // carga útil mínima

        jwt.sign( payload, process.env.SECRETKEY, {
            expiresIn: '12h' // Limita la validez del token
        }, ( err, token) => {
            if ( err ) {
                console.log( err );
                reject( 'JWT could not be created' )
            }else {
                resolve( token )
            }
        }) 
        
    })
}

// Exporta la función para uso en controladores de autenticación
module.exports = {
    generatorJWT
}

