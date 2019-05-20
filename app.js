const express = require('express')
const app = express()
const mongoose = require('mongoose')
const index = require('./router/index')
const movie = require('./router/movie')
var cors = require('cors')

app.use('/',index)
app.use('/api',movie)

// app.use(cors({
//   origin:['http://localhost:3000'],
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

var whitelist = ['http://localhost:3000']

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.get('/hello/testGff', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for only example.com.'})
})

mongoose.connect('mongodb://localhost:27017/flyfishBlog')

app.listen(3000,() => {
  console.log('app listening on port 3000.')
})
