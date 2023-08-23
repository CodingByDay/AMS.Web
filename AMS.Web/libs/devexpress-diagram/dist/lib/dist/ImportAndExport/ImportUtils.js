"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportUtils = void 0;
var ImportUtils = (function () {
    function ImportUtils() {
    }
    ImportUtils.parseJSON = function (json) {
        if (!json || json === "")
            return {};
        try {
            return JSON.parse(json);
        }
        catch (_a) {
            return {};
        }
    };
    ImportUtils.createDocument = function (xml) {
        var parser = new DOMParser();
        return parser.parseFromString(xml, "application/xml");
    };
    return ImportUtils;
}());
exports.ImportUtils = ImportUtils;
//# sourceMappingURL=ImportUtils.js.map