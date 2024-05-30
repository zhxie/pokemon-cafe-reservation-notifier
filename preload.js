const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  start: (domain, number, date, endpoint) =>
    ipcRenderer.send("start", domain, number, date, endpoint),
});
