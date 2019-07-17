let custom = {
  path: `file://${__dirname}/index.html`
}
let run = ({ name,port,type})=>{
  if (type){
    let server = require('./' + name)
    custom = server.run(port)
  } else if (name){
    custom.path = `file://${__dirname}/${name}/index.html`
  }
  return custom
}

module.exports = {
  run
}