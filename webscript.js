// Foodpanda Desktop web script

"use strict";

(() => {
    console.log("[Foodpanda Desktop] Web script loaded!");
    
    var path = location.pathname;
    var href = location.href;

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

    if (history.length > 1 && href !== window.electron.foodpandaDefaultURL) {
        var doc = document.createElement("div");
        doc.id = "gobackbtn";
        var hoverStyle = `
            #gobackbtn:hover {
                background-color: #747474;
            }`;
        doc.style.cssText = `
            transition: 0.5s;
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            color: #d70f64;
            background-color: #fff;
            border-radius: 15px;
            box-shadow: -4px 4px 10px 0px #0000008c;
            line-height: 30px;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-weight: bold;
            user-select: none;`;
        doc.innerHTML = `<span id="turnback">&lt;</span>`;
        doc.addEventListener("click", () => {
            window.history.back();
        });
        doc.appendChild(document.createElement("style")).innerHTML = hoverStyle;
        document.body.appendChild(doc);
    }
})();