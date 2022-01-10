const { ipcMain, Notification, BrowserWindow } = require("electron");
var path = require("path");

var orderList = new Map();

function addToOrder(orderid) {
    return orderWin(orderid);
}

function removeFromOrder(orderid) {
    orderList.delete(orderid);
}

function orderWin(orderid) {
    if (orderList.has(orderid)) return;
    var win = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'ordercheckWeb.js')
        }
    });

    win.loadURL(`https://www.foodpanda.com.tw/order-tracking/${orderid}`);

    win.on('closed', () => {
        win = null;
        removeFromOrder(orderid);

        var nof = new Notification({
            title: "Foodpanda Desktop",
            body: `Order ${orderid} has been delivered!`,
            icon: path.join(__dirname, 'icon.png'),
        });
        nof.once('click', () => {
            global.mainWindow.loadURL(`https://www.foodpanda.com.tw/order-tracking/${orderid}`);
        });
        nof.show();
    });

    orderList.set(orderid, win);

    var nof = new Notification({
        title: "Foodpanda Desktop",
        body: `Order ${orderid} has been added to your order list.`,
        icon: path.join(__dirname, 'icon.png')
    });
    nof.once('click', () => {
        global.mainWindow.loadURL(`https://www.foodpanda.com.tw/order-tracking/${orderid}`);
    });
    nof.show();
}

ipcMain.on('addToOrder', (event, orderid) => {
    addToOrder(orderid);
});