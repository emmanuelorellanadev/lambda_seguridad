const jwt = require('jsonwebtoken');

const generatorJWT = ( uid, role, name ) => {
    return new Promise ( (resolve, reject) => {
        const payload = { uid, role, name }; //carga util

        jwt.sign( payload, process.env.SECRETKEY, {
            expiresIn: '12h'
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

module.exports = {
    generatorJWT
}

