const express = require('express')
const app = express()

const config = require('./config')

console.log('server is running...', `http://localhost:${config.port}/`)

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(config.port)