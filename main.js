const electron = require('electron');
const fs = require('fs');
const {
    app,
    BrowserWindow,
    Menu,
    Notification
} = electron;
const path = require('path');
const { addToOrder } = require('./order.js');

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
            label: "Go To",
            submenu: [
                {
                    label: "Home",
                    click: () => {
                        mainWindow.loadURL('https://www.foodpanda.com.tw/');
                    }
                },
                {
                    label: "My Orders",
                    click: () => {
                        mainWindow.loadURL('https://www.foodpanda.com.tw/orders');
                    }
                },
                {
                    label: "Profile",
                    click: () => {
                        mainWindow.loadURL('https://www.foodpanda.com.tw/profile');
                    }
                },
                {
                    label: "Coupons",
                    click: () => {
                        mainWindow.loadURL('https://www.foodpanda.com.tw/vouchers/new');
                    }
                },
                {
                    label: "Challenges",
                    click: () => {
                        mainWindow.loadURL('https://www.foodpanda.com.tw/rewards/challenges');
                    }
                },
                {
                    label: "Refund",
                    click: () => {
                        mainWindow.loadURL('https://www.foodpanda.com.tw/refund-account');
                    }
                }
            ]
        }
    ]));
    mainWindow.loadURL("https://www.foodpanda.com.tw/");

    require("@electron/remote/main").enable(mainWindow.webContents)

    mainWindow.webContents.openDevTools();

    mainWindow.webContents.on("did-finish-load", () => {
        var script = fs.readFileSync("./webscript.js").toString();
        mainWindow.webContents.executeJavaScript(script);
    })

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);