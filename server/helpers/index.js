const bcrypt = require('bcrypt')

module.exports = {
    encrypt: function (email,password) {
        return new Promise(function (resolve, reject) {
            const saltRound = 10
            const text = email + password
            bcrypt.genSalt(saltRound, function (err, salt) {
                bcrypt.hash(text, salt, function (err, hash) {
                    if (!err) {
                        resolve(hash)
                    } else {
                        reject(err)
                    }
                })
            })
        })
    }
}