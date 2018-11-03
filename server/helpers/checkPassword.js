const bcrypt = require('bcrypt')

function checkPassword (salt, password, email) {
  return new Promise((resolve, reject) => {
      const emailPassword = email + password
      bcrypt.compare(emailPassword, salt, function (err, data) {
          if (data) {
              resolve(data)
          } else {
              reject(err)
          }
      });
  })
}

module.exports = checkPassword