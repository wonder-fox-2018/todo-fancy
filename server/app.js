const express  = require('express')
const routes   = require('./routes')
const userRoutes = require('./routes/users')
const todoRoutes = require('./routes/todo')
const mongoose = require('mongoose')
const cors     = require('cors')
require('dotenv').config()
const app = express()
const port = 3000

mongoose.connect(process.env.MY_LOCAL_MONGODB, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo failed to connect:'));
db.once('open', function() {
  console.log('mongo connected')
});

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())


//ROUTES
app.use('/', routes)
app.use('/users',userRoutes)
app.use('/todo',todoRoutes)

app.listen(port, function(){
    console.log('Listening on port', port)
})