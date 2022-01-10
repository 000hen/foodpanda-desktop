// Foodpanda Desktop web script

"use strict";

(() => {
    var path = location.pathname;

    if (path.match(/\/order-tracking\/(\w{4}-\w{4})/gm)) {
        var orderid = path.replace(/\/order-tracking\/(\w{4}-\w{4})/gm, "$1");
        var f = setInterval(() => {
            try {
                var g = document.querySelector(".vendor-name");
                clearInterval(f);
                window.electron.addToOrder(orderid, g.innerHTML);
            } catch (e) { }
        }, 1000);
        
    }
})();