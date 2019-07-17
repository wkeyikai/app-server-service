const path = require('path')
const config = require('./config')
// const url = require('url')
const project = require('./project')
const custom = project.run(config)
const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  dialog
} = require('electron')

let trayIcon = null

app.on('ready', createWindow)

app.on('browser-window-created', (e, window) => {
  window.setMenu(null)
})

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
    skipTaskbar: true,
    toolbar: false
    // frame: false
    // show: false
  })

  // win.setMenu(null)
  // win.setMenuBarVisibility(false)
  // win.removeMenu()
  // var menu = Menu.buildFromTemplate([])
  // Menu.setApplicationMenu(menu)
  win.loadURL(custom.path)
  // win.once('ready-to-show', () => {
  //   child.show()
  // })

  // Open DevTools.
  // win.webContents.openDevTools()
  win.on('close', (event) => {
    win.hide()
    // 避免[clsoe]觸發[closed]
    event.preventDefault()
  })
  // When Window Close.
  win.on('closed', (event) => {
    win = null
    trayIcon = null
  })

  // Create Tray
  createTray()

}

function createTray() {
  const iconPath = path.join(__dirname, 'static/cc.ico')

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'cc',
      click() {
        win.show()
      }
    },
    {
      label: 'Quit',
      click() {
        let option = { 
          type: 'info', 
          title: '提示', 
          message: '是否離開程式', 
          buttons: ['是', '否']
          // defaultId: 0,
        }
        dialog.showMessageBox(option, (response)=>{
          if (response==0){
            win.removeAllListeners('close')
            win.close()
          }
        })
      }
    }
  ])

  trayIcon = new Tray(iconPath)
  trayIcon.setToolTip('cc')
  trayIcon.setContextMenu(contextMenu)
  trayIcon.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  })
  // win.on('show', () => {
  //   trayIcon.setHighlightMode('always')
  // })
  // win.on('hide', () => {
  //   trayIcon.setHighlightMode('never')
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