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
    var script = fs.readFileSync(path.join(__dirname, "ordercheckWeb.js")).toString();
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

function snf(location, data) {
    var locale = new Localization(data.lang);
    sendNotification(global.packageJson.displayName, locale.parseString(locale.getLocation(location), {
        orderName: `${data.orderName}(${data.orderid})`,
        orderTime: data.orderTime
    }), () => {
        global.toPage(`order-tracking/${data.orderid}`);
    });
}

ipcMain.on('orderStatus', (event, data) => {
    switch (data.type) {
        case "got":
            snf("order.got", data);
            break;
        
        case "preparing":
            snf("order.preparing", data);
            break;
        
        case "delivering":
            snf("order.delivering", data);
            break;
        
        case "almost":
            snf("order.delivering.almost", data);
            break;
        
        case "delivered":
            snf("order.delivered", data);
            break;
    };
});