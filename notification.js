const { Notification } = require("electron");

function sendNotification(title, body, callback) {
    var n = new Notification({
        title: title,
        body: body
    });
    n.on('click', callback);
    n.show();
}

module.exports = {
    sendNotification
};