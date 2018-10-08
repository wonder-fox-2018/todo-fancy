const bcrypt = require('bcrypt')

function generatePassword (email, password) {
  return new Promise(function (resolve, reject) {
      const saltRound = 10
      const emailPassword = email + password
      bcrypt.genSalt(saltRound, function (err, salt) {
          bcrypt.hash(emailPassword, salt, function (err, hash) {
              if (!err) {
                  resolve(hash)
              } else {
                  reject(err)
              }

          })
      })
  })
}

module.exports = generatePassword