const express = require('express')
const app = express()
const api = require('./api')
const setting = {
  port:3000,
  default: `file://${__dirname}/index.html`
}

api.build(app)

app.use('/static', express.static(__dirname +'/static'))

app.get('/', function (req, res) {
  //res.send('Hello World')
  res.sendFile(__dirname + '/view/index.html')
})

app.get('/Hello', function (req, res) {
  res.send('Hello World~')
})

let run = () =>{
  let host = `http://localhost:${setting.port}/`
  let path = setting.default
  console.log('path',path)
  let server = app.listen(setting.port, () => {
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