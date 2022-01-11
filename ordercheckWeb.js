// Foodpanda Desktop order checker

"use strict";

(() => {
    var path = location.pathname;
    var orderid = path.replace(/\/order-tracking\/(\w{4}-\w{4})/gm, "$1");
    var nowOn = "";

    setInterval(() => {
        try {
            var c = document.querySelector("img.order-status-illustration").src;

            if (c === "https://images.deliveryhero.io/image/pd-otp-illustrations/v2/FP_TW/illu-delivered.gif") {
                window.electron.ipcRenderer.send("orderStatus", {
                    type: "delivered",
                    orderid: orderid,
                    orderName: document.querySelector(".vendor-name").innerHTML,
                    lang: document.querySelector("html").lang
                });
                window.close();
            }
        } catch (e) { }
        
        try {
            var f = document.querySelector(".order-status-progress-bar.order-status-progress-bar-active").parentNode.getAttribute("data-testid").split("__")[2];
            var time = document.querySelector("figcaption[data-testid=order-status__eta__label__eta]").innerHTML.replace(/ /gm, "");

            switch (f) {
                case "0":
                    if (nowOn !== "got") {
                        // got order
                        window.electron.ipcRenderer.send("orderStatus", {
                            type: "got",
                            orderid: orderid,
                            orderName: document.querySelector(".vendor-name").innerHTML,
                            orderTime: time,
                            lang: navigator.language
                        });
                        nowOn = "got";
                    }
                    break;

                case "1":
                    if (nowOn !== "preparing") {
                        // preparing
                        window.electron.ipcRenderer.send("orderStatus", {
                            type: "preparing",
                            orderid: orderid,
                            orderName: document.querySelector(".vendor-name").innerHTML,
                            orderTime: time,
                            lang: navigator.language
                        });
                        nowOn = "preparing";
                    }
                    break;

                case "2":
                    if (nowOn !== "delivering") {
                        // delivering
                        window.electron.ipcRenderer.send("orderStatus", {
                            type: "delivering",
                            orderid: orderid,
                            orderName: document.querySelector(".vendor-name").innerHTML,
                            orderTime: time,
                            lang: navigator.language
                        });
                        nowOn = "delivering";
                    }
                    break;

                case "3":
                    if (nowOn !== "almost") {
                        // almost here
                        window.electron.ipcRenderer.send("orderStatus", {
                            type: "almost",
                            orderid: orderid,
                            orderName: document.querySelector(".vendor-name").innerHTML,
                            orderTime: time,
                            lang: navigator.language
                        });
                        nowOn = "almost";
                    }
                    break;
            }
        } catch (e) { }
    }, 1000);
})()