var electron = require('electron')
var ipcMain = require('electron').ipcMain

var app = electron.app
var BrowserWindow = electron.BrowserWindow
var mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 200,
  })
  mainWindow.loadURL(`file://${__dirname}/example.html`)

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', function() {
  createWindow()
  mainWindow.webContents.on('did-finish-load', function () {
    mainWindow.webContents.send('initList', ['original', 'new'])
    mainWindow.webContents.send('initOrder', [0, 1, 0])
  })

  ipcMain.on('reset', function () {
    console.log('reset')
  })

  ipcMain.on('play', function () {
    console.log('play')
  })

  ipcMain.on('pause', function () {
    console.log('pause')
  })

  ipcMain.on('advance', function () {
    console.log('advance')
  })

    ipcMain.on('nextTrial', function (event, data) {
    console.log('nextTrial', data)
  })

  ipcMain.on('initTrial', function (event, data) {
    console.log('initTrial', data)
  })

  ipcMain.on('logging', function (event, data) {
    console.log('logging', data)
  })

  ipcMain.on('number', function (event, data) {
    console.log('number', data)
  })

  process.stdin.on('data', function(data) {
    if (data.toString().trim() === 'a') {
      mainWindow.webContents.send('nextTrial')
    }
  })

    process.stdin.on('data', function(data) {
    if (data.toString().trim() === 'z') {
      mainWindow.webContents.send('number', 34)
    }
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})