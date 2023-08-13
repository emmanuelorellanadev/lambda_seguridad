const bcrypt = require('bcryptjs');

const encryptPass = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync( password, salt); 
}

const checkPassword = (password, savedPassword) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, savedPassword, (err, matches) => {
        if (err) reject(err)
        else resolve(matches)
      })
    })
  }

// const checkPassword = (password, sha) => {
//     return bcrypt.compareSync(password, sha);
// }

module.exports = {
    encryptPass,
    checkPassword
}