require('dotenv').config()

const hash = require('bycjwt'),
      User = require('../models/users')


module.exports = {

      signUp: (req, res) => {
        let objUser = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        }

        let user = new User(objUser)
        user.save()
          .then( result => res.status(201).json({result}))
          .catch(err => res.status(500).json({err}))
      },

      signIn: (req, res) => {
        let email = req.body.email
        let password = req.body.password

        User.findOne({
          email: email
        })
          .then(user => {
            if (hash.bcdecode(password, user.password)) {
              res.status(200).json({
                name: user.name,
                token: hash.jwtencode({
                  id: user._id,
                  name: user.name,
                  email: user.email
                })
              })
            }
            else {
              res.status(400).json({message: "Incrorrect password"})
            }
          })
          .catch(err => {
            res.status(500).json({err})
          })
      }

      
}