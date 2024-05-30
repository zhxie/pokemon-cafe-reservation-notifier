const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createAppWindow = () => {
  const win = new BrowserWindow({
    width: 360,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.setAutoHideMenuBar(true);
  win.setMenuBarVisibility(false);

  win.loadFile("index.html");
};

const createCafeWindow = (number, date, endpoint) => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "inject.js"),
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  win.loadURL("https://osaka.pokemon-cafe.jp/reserve/step1");

  win.webContents.on("did-finish-load", () => {
    win.webContents.executeJavaScript(
      `window.electron.inject("${number}", "${date}", "${endpoint}");`
    );
  });
};

app.whenReady().then(() => {
  createAppWindow();
});

ipcMain.on("start", (_, number, date, endpoint) => {
  createCafeWindow(number, date, endpoint);
});
