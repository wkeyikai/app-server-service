const express = require('express')
const app = express()
const api = require('./api')

api.build(app)

app.get('/', function (req, res) {
  //res.send('Hello World')
  res.sendFile(__dirname + '/view/index.html')
})

app.get('/Hello', function (req, res) {
  res.send('Hello World~')
})

let run = (port) =>{
  let host = `http://localhost:${port}/`
  let path = host
  app.listen(port, () => {
    console.log('server is running...', host)
  })
  return { 
    path,
    host
  }
}

module.exports = {
  run
}