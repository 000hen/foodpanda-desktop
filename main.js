const electron = require('electron');
const fs = require('fs');
const {
    app,
    BrowserWindow,
    Menu,
    globalShortcut,
} = electron;
const path = require('path');
require("./order.js");
const { Localization } = require("./i18n.js");
const osLang = Intl.DateTimeFormat().resolvedOptions().locale;
const locale = new Localization(osLang);
const packageJson = require('./package.json');

require('@electron/remote/main').initialize()

Menu.setApplicationMenu(null);

function createWindow() {
    var mainWindow = global.mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // Hide the menu bar
    mainWindow.setMenu(Menu.buildFromTemplate([
        {
            label: locale.getLocation("default.menu"),
            submenu: [
                {
                    // Home
                    label: locale.getLocation("default.menu.home"),
                    click: () => {
                        mainWindow.loadURL('https://www.foodpanda.com.tw/');
                    }
                },
                {
                    // Orders
                    label: locale.getLocation("default.menu.orders"),
                    click: () => {
                        mainWindow.loadURL('https://www.foodpanda.com.tw/orders');
                    }
                },
                {
                    // Profile
                    label: locale.getLocation("default.menu.profile"),
                    click: () => {
                        mainWindow.loadURL('https://www.foodpanda.com.tw/profile');
                    }
                },
                {
                    // Coupons
                    label: locale.getLocation("default.menu.coupons"),
                    click: () => {
                        mainWindow.loadURL('https://www.foodpanda.com.tw/vouchers/new');
                    }
                },
                {
                    // Challenges
                    label: locale.getLocation("default.menu.challenges"),
                    click: () => {
                        mainWindow.loadURL('https://www.foodpanda.com.tw/rewards/challenges');
                    }
                },
                {
                    // Refunds
                    label: locale.getLocation("default.menu.refunds"),
                    click: () => {
                        mainWindow.loadURL('https://www.foodpanda.com.tw/refund-account');
                    }
                }
            ]
        }
    ]));
    mainWindow.loadURL("https://www.foodpanda.com.tw/");

    require("@electron/remote/main").enable(mainWindow.webContents)

    if (process.env.NODE_ENV === "development") mainWindow.webContents.openDevTools();

    mainWindow.webContents.on("did-finish-load", () => {
        var script = fs.readFileSync(path.join(__dirname, "webscript.js")).toString();
        mainWindow.webContents.executeJavaScript(script);
    })

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    globalShortcut.register('CommandOrControl+Shift+I', () => {
        if (global.mainWindow) global.mainWindow.webContents.openDevTools();
    });
}

app.on('ready', createWindow);
app.setAppUserModelId(packageJson.displayName);