// Foodpanda Desktop order checker

"use strict";

(() => {
    var path = location.pathname;
    var orderid = path.replace(/\/order-tracking\/(\w{4}-\w{4})/gm, "$1");

    window.addEventListener("load", () => {
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

                switch (f) {
                    case "0":
                        // got order
                        window.electron.ipcRenderer.send("orderStatus", {
                            type: "got",
                            orderid: orderid,
                            orderName: document.querySelector(".vendor-name").innerHTML,
                            lang: navigator.language
                        });
                        break;

                    case "1":
                        // preparing
                        window.electron.ipcRenderer.send("orderStatus", {
                            type: "preparing",
                            orderid: orderid,
                            orderName: document.querySelector(".vendor-name").innerHTML,
                            lang: navigator.language
                        });
                        break;

                    case "2":
                        // delivering
                        window.electron.ipcRenderer.send("orderStatus", {
                            type: "delivering",
                            orderid: orderid,
                            orderName: document.querySelector(".vendor-name").innerHTML,
                            lang: navigator.language
                        });
                        break;

                    case "3":
                        // almost here
                        window.electron.ipcRenderer.send("orderStatus", {
                            type: "almost",
                            orderid: orderid,
                            orderName: document.querySelector(".vendor-name").innerHTML,
                            lang: navigator.language
                        });
                        break;
                }
            } catch (e) { }
        }, 1000);
        
    });
})()