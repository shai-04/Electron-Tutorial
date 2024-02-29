// Modules
const {app, BrowserWindow} = require('electron');
const { setTimeout } = require('timers');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secondaryWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  secondaryWindow = new BrowserWindow({
    width: 300, height: 300,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    },
    parent: mainWindow,
    modal: true, //optional,
    show: false // if making a modal, only show it when needed
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html');
  secondaryWindow.loadFile('index.html');

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
      // debugger is basically a keyword for a breakpoint
        mainWindow = null
  })
  // Listen for window being closed
  secondaryWindow.on('closed',  () => {
      // debugger is basically a keyword for a breakpoint
        secondaryWindow = null
  })
}

// Show secondary window 3 seconds after main window is shown
app.on('ready', () => {
  createWindow();
  setTimeout(() => {
    secondaryWindow.show();
  }, 3000);
})

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
