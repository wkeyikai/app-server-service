const express = require('express')
const app = express()
const api = require('./api')
const setting = {
  port:3000,
  url: `file://${__dirname}/index.html`
  // default: `http://localhost:3000/test.html`
}

api.build(app)

app.use('/static', express.static(__dirname +'/static'))

app.use('/', express.static(__dirname + '/view'))

app.use('/js', express.static(__dirname + '/js'))

app.get('/', function (req, res) {
  //res.send('Hello World')
  res.sendFile(__dirname + '/view/index.html')
})

app.get('/Hello', function (req, res) {
  res.send('Hello World~')
})

let run = () =>{
  let host = `http://localhost:${setting.port}/`
  let url = setting.url
  console.log('path', url)
  let server = app.listen(setting.port, () => {
    console.log('server is running...', host)
  })
  return { 
    url,
    host
  }
}

module.exports = {
  run
}