// Foodpanda Desktop web script

"use strict";

(() => {
    var path = location.pathname;

    if (path.match(/\/order-tracking\/(\w{4}-\w{4})/gm)) {
        var orderid = path.replace(/\/order-tracking\/(\w{4}-\w{4})/gm, "$1");
        window.electron.addToOrder(orderid);
    }
})();