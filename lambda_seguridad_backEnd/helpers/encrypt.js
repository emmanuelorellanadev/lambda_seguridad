
// Utilidad para encriptar contraseñas y validarlas usando bcrypt.
const bcrypt = require('bcryptjs');

// Encripta la contraseña usando bcrypt con salt de 10 rondas.
// Nunca almacena contraseñas en texto plano.
const encryptPass = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync( password, salt); 
}

// Compara la contraseña ingresada con la almacenada (encriptada).
// Devuelve una promesa que resuelve si coinciden.
const checkPassword = (password, savedPassword) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, savedPassword, (err, matches) => {
        if (err) reject(err)
        else resolve(matches)
      })
    })
}

// Implementación alternativa comentada, solo para referencia.
// const checkPassword = (password, sha) => {
//     return bcrypt.compareSync(password, sha);
// }

// Exporta las utilidades de encriptación para uso en controladores y modelos
module.exports = {
    encryptPass,
    checkPassword
}