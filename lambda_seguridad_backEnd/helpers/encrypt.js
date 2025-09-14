const bcrypt = require('bcryptjs');

const encryptPass = (password) => {
    // Increased salt rounds for better security (was 10, now 12)
    const salt = bcrypt.genSaltSync(12);
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