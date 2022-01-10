const { ipcMain, BrowserWindow } = require("electron");
const { sendNotification } = require("./notification");
const Localization = require("./i18n.js").Localization;
const fs = require("fs");
var path = require("path");

var orderList = new Map();

function addToOrder(orderid) {
    return orderWin(orderid);
}

function removeFromOrder(orderid) {
    orderList.delete(orderid);
}

function orderWin(orderid, orderName) {
    if (orderList.has(orderid)) return;
    var win = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadURL(`https://www.foodpanda.com.tw/order-tracking/${orderid}`);
    var script = fs.readFileSync("./ordercheckWeb.js").toString();
    win.webContents.executeJavaScript(script);

    if (process.env.NODE_ENV === "development") {
        win.webContents.openDevTools();
        win.show();
    }

    win.on('closed', () => {
        win = null;
        removeFromOrder(orderid);
    });

    orderList.set(orderid, win);
}

ipcMain.on('addToOrder', (event, orderid) => {
    addToOrder(orderid);
});

ipcMain.on('orderStatus', (event, data) => {
    switch (data.type) {
        case "got":
            var locale = new Localization(data.lang);
            sendNotification("Foodpanda Desktop", locale.parseString(locale.getLocation("order.got"), { orderName: `${data.orderName}(${data.orderid})` }), () => {
                global.mainWindow.loadURL(`https://www.foodpanda.com.tw/order-tracking/${data.orderid}`);
            });
            break;
        
        case "preparing":
            var locale = new Localization(data.lang);
            sendNotification("Foodpanda Desktop", locale.parseString(locale.getLocation("order.preparing"), { orderName: `${data.orderName}(${data.orderid})` }), () => {
                global.mainWindow.loadURL(`https://www.foodpanda.com.tw/order-tracking/${data.orderid}`);
            });
            break;
        
        case "delivering":
            var locale = new Localization(data.lang);
            sendNotification("Foodpanda Desktop", locale.parseString(locale.getLocation("order.delivering"), { orderName: `${data.orderName}(${data.orderid})` }), () => {
                global.mainWindow.loadURL(`https://www.foodpanda.com.tw/order-tracking/${data.orderid}`);
            });
            break;
        
        case "almost":
            var locale = new Localization(data.lang);
            sendNotification("Foodpanda Desktop", locale.parseString(locale.getLocation("order.delivering.almost"), { orderName: `${data.orderName}(${data.orderid})` }), () => {
                global.mainWindow.loadURL(`https://www.foodpanda.com.tw/order-tracking/${data.orderid}`);
            });
            break;
        
        case "delivered":
            var locale = new Localization(data.lang);
            sendNotification("Foodpanda Desktop", locale.parseString(locale.getLocation("order.delivered"), { orderName: `${data.orderName}(${data.orderid})` }), () => {
                global.mainWindow.loadURL(`https://www.foodpanda.com.tw/order-tracking/${orderid}`);
            });
            break;
    };
});