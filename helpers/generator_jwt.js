const jwt = require('jsonwebtoken');

const generatorJWT = ( uid='' ) => {
    return new Promise ( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETKEY, {
            expiresIn: '12h'
        }, ( err, token) => {
            if ( err ) {
                console.log( err );
                reject( 'JWT could not create' )
            }else {
                resolve( token )
            }
        }) 
    })
}

module.exports = {
    generatorJWT
}

