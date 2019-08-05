let fs = require("fs")
let ws = {}
let custom = {
  path: `file://${__dirname}/index.html`
}

let created = ({file}) =>{
  if (fs.existsSync(`${__dirname}/` + file)){
    ws = require('./' + file).run()
    custom.path = ws.path
  }
  return custom
}

module.exports = {
  created
}