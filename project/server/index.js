const express = require('express')
const app = express()
const api = require('./api')

api.build(app)

app.get('/', function (req, res) {
  //res.send('Hello World')
  res.sendFile(__dirname + '/view/index.html')
})

app.get('/Hello', function (req, res) {
  res.send('Hello World')
})

let run = (port) =>{
  let path = `http://localhost:${port}/`
  app.listen(port, () => {
    console.log('server is running...', path)
  })
  return { 
    path
  }
}

module.exports = {
  run
}