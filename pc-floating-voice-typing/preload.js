const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('desktopVoice', {
  pasteText: text => ipcRenderer.send('paste-text', text),
  hidePanel: () => ipcRenderer.send('hide-panel'),
  setAlwaysOnTop: value => ipcRenderer.send('set-always-on-top', value),
  onHotkeyToggle: callback => ipcRenderer.on('hotkey-toggle', callback),
  onHotkeyStop: callback => ipcRenderer.on('hotkey-stop', callback)
});
