const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  start: (number, date, endpoint) =>
    ipcRenderer.send("start", number, date, endpoint),
});
