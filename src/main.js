const { app, BrowserWindow, Tray } = require('electron');
const path = require('path');

let mainWindow;
let tray = null;

const createTray = () => {
  tray = new Tray(path.join(__dirname, '../assets/eye.png'));
  tray.on('right-click', toggleWindow);
  tray.on('double-click', toggleWindow);
  tray.on('click', toggleWindow);
};

const toggleWindow = () => {
  mainWindow.isVisible() ? mainWindow.hide() : showWindow();
};

const getWindowPosition = () => {
  const windowBounds = mainWindow.getBounds();
  const trayBounds = tray.getBounds();

  // Display app's window just below the tray's icon
  const x = trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2;
  const y = trayBounds.y + trayBounds.height;

  return { x, y };
};

const showWindow = () => {
  const position = getWindowPosition();
  mainWindow.setPosition(position.x, position.y, false);
  mainWindow.show();
  mainWindow.focus();
};

function createWindow() {
  mainWindow = new BrowserWindow({
    frame: false,
    fullscreenable: false,
    height: 500,
    icon: path.join(__dirname, '../assets/eye.png'),
    resizable: false,
    show: false,
    transparent: true,
    width: 430,
  });

  mainWindow.loadFile(path.join(__dirname, '../index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('blur', () => {
    mainWindow.hide();
  });

  // mainWindow.webContents.openDevTools();

  return mainWindow;
}

app.whenReady().then(() => {
  createTray();
  createWindow();

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
