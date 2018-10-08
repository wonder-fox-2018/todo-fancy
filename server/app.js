const express  = require('express')
const routes   = require('./routes')
const mongoose = require('mongoose')
const cors     = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.POST || 3000

mongoose.connect(process.env.URL_MONGO_LOCAL, { useNewUrlParser: true });
// mongoose.connect(URL_MONGO_MLAB , { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connected')
});

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use('/', routes)

app.listen(port, function(){
    console.log('Listening on port', port)
})