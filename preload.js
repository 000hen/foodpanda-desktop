const {
    contextBridge,
    ipcRenderer,
    shell
} = require('electron');
var remote = require('@electron/remote');
var fs = require('fs');
var Localization = require('./i18n.js').Localization;

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
