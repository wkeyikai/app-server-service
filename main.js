const {
  app,
  BrowserWindow,
  Tray,
  Menu
} = require('electron')

const path = require('path')
const url = require('url')
const express = require('./express-server.js')

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  // darwin = MacOS
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    title:'cc',
    icon: path.join(__dirname, 'static/cc.ico'),
    width: 400,
    height: 400,
    maximizable: false,
    // frame: false
    // show: false
  })
  win.setMenu(null)
  //win.setMenuBarVisibility(false)
  //win.removeMenu()
  // var menu = Menu.buildFromTemplate([])
  // Menu.setApplicationMenu(menu)
  win.loadURL(express.path)
  // win.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))
  // win.once('ready-to-show', () => {
  //   child.show()
  // })

  // Open DevTools.
  //win.webContents.openDevTools()

  win.on('close', (event) => {
    win.hide()
    //避免[clsoe]觸發[closed]
    event.preventDefault()
  })
  // When Window Close.
  win.on('closed', () => {
    win = null
  })

  // Create Tray
  createTray()

}

function createTray() {
  let appIcon = null
  const iconPath = path.join(__dirname, 'static/cc.ico')

  const contextMenu = Menu.buildFromTemplate([{
    label: 'cc',
    click() {
      win.show()
    }
  },
  {
    label: 'Quit',
    click() {
      win.removeAllListeners('close')
      win.close()
    }
  }
  ]);

  appIcon = new Tray(iconPath)
  appIcon.setToolTip('cc')
  appIcon.setContextMenu(contextMenu)
  appIcon.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  })
  // win.on('show', () => {
  //   appIcon.setHighlightMode('always')
  // })
  // win.on('hide', () => {
  //   appIcon.setHighlightMode('never')
  // })
}

//產生捷徑讓使用者分辨操作
var handleStartupEvent = function () {
  if (process.platform !== 'win32') {
    return false;
  }

  var squirrelCommand = process.argv[1]

  switch (squirrelCommand) {
    case '--squirrel-install':
    case '--squirrel-updated':
      install()
      return true
    case '--squirrel-uninstall':
      uninstall()
      app.quit()
      return true
    case '--squirrel-obsolete':
      app.quit()
      return true
  }

  function install() {
    var cp = require('child_process')
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe')
    var target = path.basename(process.execPath)
    var child = cp.spawn(updateDotExe, ["--createShortcut", target], { detached: true })
    child.on('close', function (code) {
      app.quit()
    });
  }

  function uninstall() {
    var cp = require('child_process')
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe')
    var target = path.basename(process.execPath)
    var child = cp.spawn(updateDotExe, ["--removeShortcut", target], { detached: true })
    child.on('close', function (code) {
      app.quit()
    });
  }

};

if (handleStartupEvent()) {
  return
}