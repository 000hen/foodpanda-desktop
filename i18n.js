class Localization {
    constructor(languageid) {
        var { app } = require('electron');
        this.defaultLang = "en-US";
        this.languageid = app.commandLine.getSwitchValue("language") || languageid || this.defaultLang;
        this.fs = require('fs');
        this.path = require('path');
    }

    getLocation(langLocation) {
        var lang = this.defaultLang;
        if (this.fs.existsSync(this.path.join(__dirname, "locals", `${this.languageid}.json`))) lang = this.languageid;
        var location = JSON.parse(this.fs.readFileSync(this.path.join(__dirname, "locals", `${lang}.json`)).toString());
        try {
            return location.data.find(x => x.location == langLocation).value;
        } catch (e) {
            return undefined;
        }
    }

    parseString(str, replacements) {
        var result = str;
        for (var key in replacements) {
            result = result.replace(new RegExp(`%${key}%`, "g"), replacements[key]);
        }
        return result;
    }
}

exports.Localization = Localization;