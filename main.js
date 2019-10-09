const path = require('path')
const config = require('./config')
// const url = require('url')
const project = require('./project')
const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  dialog
} = require('electron')

let custom = project.created(config)
let iconPath = path.join(__dirname, `static/${config.icon || 'favicon.ico' }`)
let title = config.title || ''
let trayIcon = null

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

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
    title: title,
    icon: iconPath,
    width: 400,
    height: 400,
    maximizable: false,
    skipTaskbar: true,
    transparent: true,
    webPreferences:{
      nodeIntegration: true
    }
    // toolbar: false
    // frame: false
    // show: false
  })
  // console.log('win.webContents', win.webContents)
  // win.setMenu(null)
  // win.setMenuBarVisibility(false)
  // win.removeMenu()
  // var menu = Menu.buildFromTemplate([{
  //   label: 'Window',
  //   submenu: [
  //     // { role: 'minimize' },
  //     {
  //       label: 'google',
  //       click() { 
  //         win.loadURL('http://www.google.com')
  //         // require('electron').shell.openExternalSync('https://electronjs.org') 
  //       },
  //       submenu: [
  //         // { role: 'minimize' },
  //         {
  //           label: 'google',
  //           click() {
  //             win.loadURL('http://www.google.com')
  //             // require('electron').shell.openExternalSync('https://electronjs.org') 
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // }])
  // Menu.setApplicationMenu(menu)
  win.loadURL(custom.url)
  // win.once('ready-to-show', () => {
  //   child.show()
  // })

  // win.setThumbarButtons([
  //   {
  //     tooltip: 'button1',
  //     icon: iconPath,
  //     click() { console.log('button1 clicked') }
  //   }
  // ])

  // Open DevTools.
  // if (process.env.NODE_ENV !== 'production'){
  //   win.webContents.openDevTools()
  // }
  win.on('close', (event) => {
    win.hide()
    // 避免[clsoe]觸發[closed]
    event.preventDefault()
  })
  // When Window Close.
  win.on('closed', (event) => {
    win = null
    trayIcon = null
    // app.quit()
  })

  // Create Tray
  createTray()

}

function createTray() {

  const contextMenu = Menu.buildFromTemplate([
    {
      label: title,
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

  trayIcon = new Tray(iconPath)//no ico error bug
  trayIcon.setToolTip(title)
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