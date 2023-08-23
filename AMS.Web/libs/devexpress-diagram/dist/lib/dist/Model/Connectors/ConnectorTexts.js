"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorTexts = exports.ConnectorText = void 0;
var ConnectorText = (function () {
    function ConnectorText(position, value) {
        this.position = position;
        this.value = value;
    }
    return ConnectorText;
}());
exports.ConnectorText = ConnectorText;
var ConnectorTexts = (function () {
    function ConnectorTexts() {
        this.items = {};
    }
    ConnectorTexts.prototype.get = function (position) {
        return this.items[position];
    };
    ConnectorTexts.prototype.set = function (position, text) {
        this.items[position] = text;
    };
    ConnectorTexts.prototype.remove = function (position) {
        delete this.items[position];
    };
    ConnectorTexts.prototype.map = function (callback) {
        var list = [];
        this.forEach(function (t) { return list.push(callback(t)); });
        return list;
    };
    ConnectorTexts.prototype.forEach = function (callback) {
        for (var key in this.items)
            if (Object.prototype.hasOwnProperty.call(this.items, key))
                callback(this.items[key]);
    };
    ConnectorTexts.prototype.count = function () {
        return Object.keys(this.items).length;
    };
    ConnectorTexts.prototype.clone = function () {
        var result = new ConnectorTexts();
        this.forEach(function (t) { result.set(t.position, new ConnectorText(t.position, t.value)); });
        return result;
    };
    ConnectorTexts.prototype.toObject = function () {
        var result = {};
        var modified = false;
        this.forEach(function (t) {
            result[t.position] = t.value;
            modified = true;
        });
        return modified ? result : null;
    };
    ConnectorTexts.prototype.fromObject = function (obj) {
        for (var key in obj)
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var position = parseFloat(key);
                if (!isNaN(position) && typeof obj[key] === "string")
                    this.set(position, new ConnectorText(position, obj[key]));
            }
    };
    return ConnectorTexts;
}());
exports.ConnectorTexts = ConnectorTexts;
//# sourceMappingURL=ConnectorTexts.js.map