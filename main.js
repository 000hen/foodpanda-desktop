const electron = require('electron');
const fs = require('fs');
const {
    app,
    BrowserWindow,
    Menu,
    globalShortcut,
    Tray
} = electron;
const path = require('path');
require("./order.js");
const { Localization } = require("./i18n.js");
const osLang = Intl.DateTimeFormat().resolvedOptions().locale;
const locale = new Localization(osLang);
const packageJson = require('./package.json');

var exit = false;

require('@electron/remote/main').initialize()

Menu.setApplicationMenu(null);

function toPage(path) {
    mainWindow.show();
    mainWindow.loadURL(`https://www.foodpanda.com.tw/${path}`);
}

var submenu = [
    {
        // Home
        label: locale.getLocation("default.menu.home"),
        click: () => {
            toPage("");
        }
    },
    {
        // Orders
        label: locale.getLocation("default.menu.orders"),
        click: () => {
            toPage("orders");
        }
    },
    {
        // Profile
        label: locale.getLocation("default.menu.profile"),
        click: () => {
            toPage("profile");
        }
    },
    {
        // Coupons
        label: locale.getLocation("default.menu.coupons"),
        click: () => {
            toPage("vouchers/new");
        }
    },
    {
        // Challenges
        label: locale.getLocation("default.menu.challenges"),
        click: () => {
            toPage("rewards/challenges");
        }
    },
    {
        // Refunds
        label: locale.getLocation("default.menu.refunds"),
        click: () => {
            toPage("refund-account");
        }
    },
    {
        label: "",
        type: "separator"
    },
    {
        // Exit
        label: locale.getLocation("default.menu.quit"),
        click: () => {
            exit = true;
            mainWindow.close();
            app.quit();
        }
    }
];

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

    var menu = Menu.buildFromTemplate([{
        label: locale.getLocation("default.menu"),
        submenu: submenu
    }]);

    var tray = mainWindow.tray = new Tray(path.join(__dirname, 'icons', 'foodpanda.png'));

    submenu.unshift(
        {
            label: locale.getLocation("default.menu.show"),
            click: () => {
                mainWindow.show();
            }
        },
        {
            lable: "",
            type: "separator"
        }
    );

    tray.setToolTip(packageJson.displayName);
    var trayMenu = Menu.buildFromTemplate(submenu);
    tray.setContextMenu(trayMenu);

    // Make the window menu
    mainWindow.setMenu(menu);
    mainWindow.loadURL("https://www.foodpanda.com.tw/");

    require("@electron/remote/main").enable(mainWindow.webContents);

    if (process.env.NODE_ENV === "development") mainWindow.webContents.openDevTools();

    mainWindow.webContents.on("did-finish-load", () => {
        var script = fs.readFileSync(path.join(__dirname, "webscript.js")).toString();
        mainWindow.webContents.executeJavaScript(script);
    })

    mainWindow.on('close', event => {
        if (!exit) {
            event.preventDefault();
            mainWindow.hide();
        }
    });

    globalShortcut.register('CommandOrControl+Shift+I', () => {
        if (global.mainWindow) global.mainWindow.webContents.openDevTools();
    });
}

app.on('ready', createWindow);
app.setAppUserModelId(packageJson.displayName);