const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  convertImages: (imagePaths) => ipcRenderer.invoke('convert-images', imagePaths),
});