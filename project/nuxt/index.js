const { Nuxt, Builder, Generator } = require('nuxt')
// const path = require('path')
// const { npx, npxSync } = require('node-npx')
let config = require('./nuxt.config.js')
process.env.NODE_ENV = 'production'
config.dev = false
// config.buildDir = './project/nuxt/.nuxt'
config.buildDir = __dirname + '/.nuxt'
// console.log(config.buildDir)
// config.buildDir = '.nuxt'
// config.debug = true
const express = require('express')
const app = express()
const { spawn, exec  } = require('child_process')
// const cwd = process.cwd()
// const nuxt = new Nuxt(config)
const setting = {
  port: 3000,
  // url: `file://${__dirname}/index.html`
  url: `http://localhost:3000`
}
let child
let run = () => {
  const nuxt = new Nuxt(config)
  const { host, port } = nuxt.options.server
  let url = setting.url
  process.env.NODE_ENV = 'production'
  // start()
  nuxt.listen(port)
  
  // console.log('path', path.join(__dirname))
 
  
  // test000()
  // test001()
  // require('./server/index.js')
  
  return {
    url,
    host
  }
}
let test000 = () => {
  // child = npx('./project/nuxt nuxt', ['-p', '3000'], { cwd, stdio: 'inherit' })
  // const cwd = 
  // console.log('__dirname', __dirname)

  // process.chdir('./project/nuxt')
  // const cwd = process.cwd()
  child = npx('npm run', ['start'], { cwd: __dirname, stdio: 'inherit' })
  console.log('child', child)

  // console.log('cwd', cwd)
  child.on('exit', (code, signal) => {
    child.kill(signal)
    console.log('exit', code, signal)
  })
  // process.cwd()
  let wrapper = (e) => {
    console.log('e', e)
    if (child) {
      // child.kill()
      // process.kill(child.pid, 'SIGTERM')
      process.exit(0)
      console.log('child kill')
    }
  }
  // child.kill()
  process.on('SIGINT', wrapper)
  process.on('SIGTERM', wrapper)
  process.on('exit', wrapper)
  process.on('uncaughtException', wrapper)
}

let test001 = () => {
  const cwd = process.cwd()
  let child1 = spawn('npm.cmd', ['run', 'start'], {
    // stdio: ['inherit', 'inherit', 'inherit'], // 三個元素陣列 下面會詳解
    cwd: __dirname,
    // detached: true,
    env: process.env,
  })
  let wrapper = () => {
    if (child1) {
      child1.kill()
      process.exit(0)
      console.log('child1 kill')
    }
  }
  // child1.stdout.on('data', function (data) {
  //     console.log('stdout: ' + data);
  //   });
  process.on('SIGINT', wrapper)
  process.on('SIGTERM', wrapper)
  process.on('exit', wrapper)
}
async function start() {
  const nuxt = new Nuxt(config)
  const { host, port } = nuxt.options.server
  await nuxt.ready()
  app.use(nuxt.render)
  app.listen(port, () => {
    console.log('server is running...', `http://${host}:${port}`)
  })
}

module.exports = {
  run
}