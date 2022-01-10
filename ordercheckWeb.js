// Foodpanda Desktop order checker

"use strict";

(() => {
    window.addEventListener("load", () => {
        setInterval(() => {
            try {
                var c = document.querySelector("img.order-status-illustration").src;

                if (c === "https://images.deliveryhero.io/image/pd-otp-illustrations/v2/FP_TW/illu-delivered.gif") {
                    window.close();
                }
            } catch (e) {}
        }, 1000);
        
    });
})()