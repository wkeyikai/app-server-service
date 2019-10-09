let fs = require("fs")
let ws = {}
let custom = {
  url: `file://${__dirname}/index.html`
}

let created = ({file}) =>{
  if (fs.existsSync(`${__dirname}/` + file)){
    ws = require('./' + file).run()
    custom.url = ws.url
  }
  return custom
}

module.exports = {
  created
}