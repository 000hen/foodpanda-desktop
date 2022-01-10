const {
    contextBridge,
    ipcRenderer,
    shell
} = require('electron');
var remote = require('@electron/remote');
var fs = require('fs');
var Localization = require('./i18n.js').Localization;
// const jQuery = require('jquery');
// var tb = titleBar.Titlebar;

// remote.getCurrentWebContents().once("dom-ready", () => {
//     var titleBar = require('custom-electron-titlebar');
//     new titleBar.Titlebar({
//         backgroundColor: titleBar.Color.fromHex('#2e2e2e'),
//     });
// });

// remote.getCurrentWebContents().on("did-frame-finish-load", () => {
//     var exc = fs.readFileSync("./webscript.js").toString();
//     remote.getCurrentWebContents().executeJavaScript(exc);
// })

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer,
    shell,
    // jQuery,
    // $: jQuery,
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
    }
});
// console.log(document)
// document.appendChild(document.createElement('script')).src = 'https://code.jquery.com/jquery-3.3.1.min.js';
// global.jQuery = require('jquery');
// global.$ = globalThis.jQuery;

