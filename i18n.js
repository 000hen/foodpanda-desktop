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
        var result = str;
        for (var key in replacements) {
            result = result.replace(new RegExp(`%${key}%`, 'g'), replacements[key]);
        }
        return result;
    }
}

exports.Localization = Localization;