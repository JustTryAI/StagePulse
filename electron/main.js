const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');

let server;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  const devUrl = process.env.VITE_DEV_SERVER_URL;
  if (devUrl) {
    win.loadURL(devUrl);
  } else {
    // Serve the production build via Express for offline/LAN use
    const appServer = express();
    const distPath = path.join(__dirname, '../dist');
    // Serve static assets from the production build
    appServer.use(express.static(distPath));
    // SPA fallback so refreshing routes works offline
    appServer.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    const port = process.env.PORT || 3000;
    server = appServer.listen(port, '0.0.0.0', () => {
      win.loadURL(`http://localhost:${port}`);
    });
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (server) server.close();
    app.quit();
  }
});
