var express = require('express');
var router = express.Router();
var cors = require('cors')
const axios = require('axios')
const CLIENT_ID="151224793788-4r8plfdiothhuoc6rhu797no88ebcu7b.apps.googleusercontent.com";

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




module.exports = router;
