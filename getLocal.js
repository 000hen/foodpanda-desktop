async function getLocal() {
    var http = require('http');
    var { app } = require('electron');
    var geoip = require('geoip-lite');
    var country = undefined;
    if (app.commandLine.hasSwitch('disable-auto-set-locale') && app.commandLine.getSwitchValue("local")) {
        country = app.commandLine.getSwitchValue("local")
    } else {
        var ip = new Promise((resolve, reject) => {
            http.get({
                host: 'api.ipify.org',
                port: 80,
                path: '/'
            }, (resp) => {
                resp.on('data', (ip) => {
                    resolve(ip.toString());
                });
            });
        });
        country = geoip.lookup(await ip).country;
    }
    switch (country.toLocaleUpperCase()) {
        // East Asia
        case "TW":
            return "https://www.foodpanda.com.tw/";
        
        case "JP":
            return "https://www.foodpanda.co.jp/";
        
        case "HK":
            return "https://www.foodpanda.hk/";
        
        // South Asia
        case "PK":
            return "https://www.foodpanda.pk/";
        
        case "BD":
            return "https://www.foodpanda.com.bd/";
        
        // Southeast Asia
        case "SG":
            return "https://www.foodpanda.sg/";
        
        case "MY":
            return "https://www.foodpanda.my/";
        
        case "KH":
            return "https://www.foodpanda.com.kh/";
        
        case "LA":
            return "https://www.foodpanda.la/";
        
        case "MM":
            return "https://www.foodpanda.com.mm/";
        
        case "PH":
            return "https://www.foodpanda.ph/";
        
        case "TH":
            return "https://www.foodpanda.co.th/";
        
        // Europe
        case "DE":
            return "https://www.foodpanda.de/";
        
        case "HU":
            return "https://www.foodpanda.hu/";
        
        case "RO":
            return "https://www.foodpanda.ro/";
        
        default:
            return `file:///${__dirname}/page/unsupport.html`;
    }
}

module.exports = {
    getLocal
};