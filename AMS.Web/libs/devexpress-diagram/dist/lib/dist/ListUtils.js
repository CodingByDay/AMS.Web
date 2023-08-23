"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashSet = void 0;
var HashSet = (function () {
    function HashSet(list, getHashCode) {
        var _this = this;
        if (list === void 0) { list = []; }
        if (getHashCode === void 0) { getHashCode = function (item) { return item.toString(); }; }
        this.items = [];
        this.map = {};
        this.getHashCode = getHashCode;
        list.forEach(function (i) { return _this.tryPush(i); });
    }
    HashSet.prototype.tryPush = function (item) {
        var code = this.getHashCode(item);
        if (this.map[code] === undefined) {
            this.map[code] = this.items.push(item) - 1;
            return true;
        }
        return false;
    };
    HashSet.prototype.contains = function (item) {
        return this.map[this.getHashCode(item)] !== undefined;
    };
    HashSet.prototype.forEach = function (callback) {
        this.items.forEach(callback);
    };
    HashSet.prototype.filter = function (predicate) {
        return this.items.filter(predicate);
    };
    HashSet.prototype.list = function () {
        return this.items.slice(0);
    };
    HashSet.prototype.item = function (index) {
        return this.items[index];
    };
    HashSet.prototype.first = function () {
        return this.items[0];
    };
    HashSet.prototype.remove = function (item) {
        var code = this.getHashCode(item);
        var index = this.map[code];
        if (typeof index === "number") {
            delete this.map[code];
            this.items.splice(index, 1);
            for (var i = index; i < this.items.length; i++)
                this.map[this.getHashCode(this.items[i])]--;
        }
        else
            throw "Item not found";
    };
    Object.defineProperty(HashSet.prototype, "length", {
        get: function () { return this.items.length; },
        enumerable: false,
        configurable: true
    });
    return HashSet;
}());
exports.HashSet = HashSet;
//# sourceMappingURL=ListUtils.js.map