const { Notification } = require("electron");
const path = require("path");

function sendNotification(title, body, callback) {
    var n = new Notification({
        title: title,
        body: body,
        icon: path.join(__dirname, "icons", "foodpanda.png"),
        silent: true
    });
    n.on('click', callback);
    n.show();
}

module.exports = {
    sendNotification
};