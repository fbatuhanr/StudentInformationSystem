import { app as _app, BrowserWindow as _BrowserWindow } from "electron";
import { join } from "path";

const app = _app;
const BrowserWindow = _BrowserWindow;
import isDev from "electron-is-dev";

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: { nodeIntegration: true, contextIsolation: false },
    });
    // and load the index.html of the app.
    console.log(__dirname);
    
    mainWindow.loadURL(isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);