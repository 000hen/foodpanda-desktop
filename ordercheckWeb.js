// Foodpanda Desktop order checker

"use strict";

(() => {
    console.log("[Foodpanda Desktop] Order checker loaded!");

    var nowOn = "";
    var path = location.pathname;

    var orderid = path.replace(/\/order-tracking\/(\w{4}-\w{4})/gm, "$1").replace("/", "");
    var orderName = "";
    var orderTime = "";

    function sendToBack(type, ordName) {
        if (nowOn === type) return;

        window.electron.ipcRenderer.send("orderStatus", {
            type: type,
            orderid: orderid,
            orderName: ordName || orderName,
            orderTime: orderTime,
            lang: navigator.language
        });
        nowOn = type;
    }

    setInterval(() => {
        try {
            var c = document.querySelector("img.order-status-illustration").src;

            if (c.match(/illu-delivered\.gif/gm)) {
                sendToBack("delivered", document.querySelector(".vendor-name").innerHTML);
                window.close();
            }
        } catch (e) { }
        
        try {
            var f = document.querySelector(".order-status-progress-bar.order-status-progress-bar-active").parentNode.getAttribute("data-testid").split("__")[2];
            orderTime = document.querySelector("figcaption[data-testid=order-status__eta__label__eta]").innerHTML.replace(/ /gm, "");
            orderName = document.querySelector(".vendor-name").innerHTML;

            switch (f) {
                case "0":
                    if (nowOn !== "got") {
                        // got order
                        sendToBack("got");
                    }
                    break;

                case "1":
                    if (nowOn !== "preparing") {
                        // preparing
                        sendToBack("preparing");
                    }
                    break;

                case "2":
                    if (nowOn !== "delivering") {
                        // delivering
                        sendToBack("delivering");
                        getChatEvent();
                    }
                    break;

                case "3":
                    if (nowOn !== "almost") {
                        // almost here
                        sendToBack("almost");
                    }
                    break;
            }
        } catch (e) { }
    }, 1000);

    function getChatEvent() {
        document.addEventListener("DOMContentLoaded", () => {
            document.querySelector("div[data-testid=CHAT__FEED]").addEventListener("DOMNodeInserted", () => {
                
            });
        });
    }
})()