const build = (app)=>{
  app.get('params/:id', function (req, res) {
    res.send('Hello World' + req.params.id)
  })
  app.get('/:id', function (req, res) {
    res.send('Hello World' + req.params.id)
  })
}

module.exports = {
  build
}