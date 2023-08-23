"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortedQueues = void 0;
var search_1 = require("@devexpress/utils/lib/utils/search");
var SortedQueues = (function () {
    function SortedQueues(getKey) {
        this.getKey = getKey;
        this._itemsArrays = {};
        this._sortedKeys = [];
    }
    Object.defineProperty(SortedQueues.prototype, "sortedKeys", {
        get: function () { return this._sortedKeys; },
        enumerable: false,
        configurable: true
    });
    SortedQueues.prototype.getQueue = function (key) {
        return this._itemsArrays[key];
    };
    SortedQueues.prototype.enqueue = function (item) {
        var key = this.getKey(item);
        if (this._itemsArrays[key] === undefined) {
            this._itemsArrays[key] = [item];
            this.addSortedKey(key);
        }
        else
            this._itemsArrays[key].push(item);
    };
    SortedQueues.prototype.remove = function (item) {
        var key = this.getKey(item);
        var itemsArray = this._itemsArrays[key];
        if (itemsArray !== undefined)
            if (!itemsArray.length)
                this.removeCore(key);
            else if (itemsArray[0] === item) {
                itemsArray.shift();
                if (!itemsArray.length)
                    this.removeCore(key);
            }
            else
                this._itemsArrays[key] = itemsArray.filter(function (x) { return x !== item; });
    };
    SortedQueues.prototype.dequeueMin = function () {
        if (!this._sortedKeys.length)
            return undefined;
        var key = this._sortedKeys[0];
        var itemsArray = this._itemsArrays[key];
        var item = itemsArray.shift();
        if (!itemsArray.length)
            this.removeCore(key);
        return item;
    };
    SortedQueues.prototype.removeCore = function (key) {
        delete this._itemsArrays[key];
        this.removeSortedKey(key);
    };
    SortedQueues.prototype.removeSortedKey = function (key) {
        var sortedPointIndex = search_1.SearchUtils.binaryIndexOf(this._sortedKeys, function (x) { return x - key; });
        if (sortedPointIndex >= 0)
            this.sortedKeys.splice(sortedPointIndex, 1);
    };
    SortedQueues.prototype.addSortedKey = function (key) {
        var sortedPointIndex = search_1.SearchUtils.binaryIndexOf(this._sortedKeys, function (x) { return x - key; });
        if (sortedPointIndex < 0)
            this._sortedKeys.splice(-(sortedPointIndex + 1), 0, key);
    };
    return SortedQueues;
}());
exports.SortedQueues = SortedQueues;
//# sourceMappingURL=SortedQueues.js.map