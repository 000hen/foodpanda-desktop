// Foodpanda Desktop web script

"use strict";

(() => {
    console.log("[Foodpanda Desktop] Web script loaded!");
    var path = location.pathname;

    if (path.match(/\/order-tracking\/(\w{4}-\w{4})/gm)) {
        var orderid = path.replace(/\/order-tracking\/(\w{4}-\w{4})/gm, "$1");
        var f = setInterval(() => {
            try {
                var g = document.querySelector(".vendor-name");
                window.electron.addToOrder(orderid, g.innerHTML);
                clearInterval(f);
            } catch (e) { }
        }, 1000);
        
    }
})();