const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  // Add any Electron APIs you want to expose to the renderer process here
  // For example:
  // sendMessage: (channel, data) => ipcRenderer.send(channel, data),
  // onMessage: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
});