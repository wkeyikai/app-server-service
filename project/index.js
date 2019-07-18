let custom = {
  path: `file://${__dirname}/index.html`
}
let run = ({ file, server })=>{
  if (server){
    let ws = require('./' + file)
    custom = ws.run(server)
  } else if (file){
    custom.path = `file://${__dirname}/${file}/index.html`
  }
  return custom
}

module.exports = {
  run
}