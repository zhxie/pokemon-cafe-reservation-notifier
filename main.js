const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");

const createAppWindow = () => {
  const win = new BrowserWindow({
    width: 360,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

const createCafeWindow = (number, date, endpoint) => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  win.loadURL("https://osaka.pokemon-cafe.jp/reserve/step1");

  win.webContents.on("did-finish-load", () => {
    win.webContents.executeJavaScript(
      `window.inject = ${inject.toString()}; inject("${number}", "${date}", "${endpoint}");`
    );
  });
};

const inject = (number, date, endpoint) => {
  setTimeout(() => {
    // Check seats.
    const data = document.querySelector("div[data-date]");
    if (data) {
      const seats = data.getAttribute("data-date");
      const capacity = JSON.parse(seats)[number][date] ?? 0;
      if (capacity) {
        fetch(
          `${endpoint.replace(
            /\/$/,
            ""
          )}/Pokémon%20Cafe%20Reservation%20Notifier/Here%20is%20a%20seat.%20Tap%20here%20to%20reserve.?url=https://osaka.pokemon-cafe.jp/`
        );
      }
      setTimeout(() => {
        window.location.href = "/";
      }, 10000);
      return;
    }

    // Table reservation / Number of guests.
    const select = document.querySelector("select");
    if (select) {
      select.selectedIndex = number;
      document.forms[0].submit();
      return;
    }

    // Please confirm.
    const input = document.querySelector("input");
    if (input) {
      window.location.href = "/reserve/auth_confirm";
      return;
    }

    // About email address authentication
    const button = document.querySelector("a");
    button.click();
  }, 2000);
};

Menu.setApplicationMenu(null);

app.whenReady().then(() => {
  createAppWindow();
});

ipcMain.on("start", (_, number, date, endpoint) => {
  createCafeWindow(number, date, endpoint);
});
