const { app, BrowserWindow, globalShortcut, ipcMain, clipboard } = require('electron');
const { execFile } = require('child_process');
const path = require('path');
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 360, height: 190, minWidth: 320, minHeight: 160,
    frame: false, transparent: false, resizable: true,
    alwaysOnTop: true, skipTaskbar: true, show: false,
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false }
  });
  win.loadFile('overlay.html');
  win.on('closed', () => { win = null; });
}
function showInactive() {
  if (!win) createWindow();
  win.once('ready-to-show', () => win.showInactive());
  if (win.isVisible()) win.hide(); else win.showInactive();
}
app.whenReady().then(() => {
  createWindow();
  globalShortcut.register('CommandOrControl+Shift+Space', () => {
    if (!win) createWindow();
    if (win.isVisible()) win.webContents.send('hotkey-toggle');
    else { win.showInactive(); win.webContents.send('hotkey-toggle'); }
  });
  globalShortcut.register('CommandOrControl+Shift+Escape', () => { if (win) win.webContents.send('hotkey-stop'); });
});
app.on('will-quit', () => globalShortcut.unregisterAll());
ipcMain.on('paste-text', (_event, text) => {
  if (typeof text !== 'string' || !text) return;
  clipboard.writeText(text);
  // Paste into whichever Windows app was focused before the floating panel appeared.
  execFile('powershell.exe', ['-NoProfile', '-Command', 'Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait("^v")'], { windowsHide: true });
});
ipcMain.on('hide-panel', () => { if (win) win.hide(); });
ipcMain.on('set-always-on-top', (_event, value) => { if (win) win.setAlwaysOnTop(!!value); });
