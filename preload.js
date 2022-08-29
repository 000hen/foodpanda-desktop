const {
    contextBridge,
    ipcRenderer
} = require('electron');
const { getGlobal } = require("@electron/remote");
var Localization = require('./i18n.js').Localization;

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer,
    require: require,
    remoteRequire: require('@electron/remote').require,
    addToOrder: function (orderid) {
        ipcRenderer.send('addToOrder', orderid);
    },
    getLocation: function (language, langLocation) {
        return new Localization(language).getLocation(langLocation);
    },
    parseString: function (str, replacements) {
        return new Localization().parseString(str, replacements);
    },
    foodpandaDefaultURL: getGlobal("foodpandaURL"),
    version: getGlobal("packageJson").version,
    displayName: getGlobal("packageJson").displayName,
    getGlobal: getGlobal,
});

window.addEventListener('DOMContentLoaded', () => {
    var copy = document.querySelector(".footer__disclaimer");
    var link = document.querySelector(".footer__nav").querySelector("ul");
    copy.innerHTML += `, ${getGlobal("packageJson").displayName} v${getGlobal("packageJson").version} by ${getGlobal("packageJson").author.name} <a href="${getGlobal("packageJson").homepage}" target="_blank">${getGlobal("packageJson").homepage}</a>`;
    link.innerHTML += `<li><a href="${getGlobal("packageJson").homepage}" target="_blank">${getGlobal("packageJson").displayName} v${getGlobal("packageJson").version}</a></li>`;
});