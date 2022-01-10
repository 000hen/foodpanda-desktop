class Localization {
    constructor(languageid) {
        this.languageid = languageid;
        this.fs = require('fs');
    }

    getLocation(langLocation) {
        var location = JSON.parse(this.fs.readFileSync(`./locals/${this.languageid}.json`).toString());
        return location.data.find(x => x.location == langLocation).value;
    }

    parseString(str, replacements) {
        var result = str.split("%");
        var fin = "";
        for (var str of result) {
            fin += replacements[str] || str;
        }
        return fin;
    }
}

exports.Localization = Localization;