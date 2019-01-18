import { app, BrowserWindow, Tray } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow;
let tray: Tray = null;

const createTray = () => {
  tray = new Tray(path.join(__dirname, '../assets/eye.png'));
  tray.on('right-click', toggleWindow);
  tray.on('double-click', toggleWindow);
  tray.on('click', toggleWindow);
};

export const toggleWindow = () => {
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
    icon: path.join(__dirname, '../assets/eye.svg'),
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

app.on('ready', () => {
  createTray();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
