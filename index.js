const express = require('express')
const app = express()

const config = require('./config')

// app.use(express.static(__dirname + '/view'))

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('params/:id', function (req, res) {
  res.send('Hello World' + req.params.id)
})

app.get('/Hello', function (req, res) {
  res.sendFile(__dirname +'/view/Hello.html')
})

app.listen(config.port,()=>{
  console.log('server is running...', `http://localhost:${config.port}/`)
})