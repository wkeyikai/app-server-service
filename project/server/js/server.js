// const {} = require('electron');
const sqlite3 = require('sqlite3').verbose()
const file = `${__dirname.replace('\\app.asar','')}/data/test.db`
console.log('file', file)
let list = document.getElementById('list')
let name = document.getElementById('name')

let readList = ()=>{
  let db = new sqlite3.Database(file)
  list.innerHTML = ''
  db.serialize(function () {
    db.run('CREATE TABLE IF NOT EXISTS user (name TEXT)')
    db.each("SELECT rowid AS id, name FROM user ORDER BY id DESC", function (err, row) {
      var div = document.createElement("div")
      div.innerHTML = row.name
      list.appendChild(div)
      console.log(row.name)
    })
    db.close()
  })
}

readList()

var add = document.getElementById('add')
add.onclick = function () {
  let db = new sqlite3.Database(file)
  db.serialize(function () {
    var stmt = db.prepare("INSERT INTO user VALUES (?)")
    stmt.run(name.value)
    // db.close()
    readList()
  })
}