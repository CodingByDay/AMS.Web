"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositionHistoryItem = exports.HistoryItem = void 0;
var HistoryItem = (function () {
    function HistoryItem() {
        this.uniqueId = -1;
    }
    HistoryItem.prototype.changeModified = function () {
        return true;
    };
    HistoryItem.prototype.getName = function () {
        return this.constructor.name;
    };
    return HistoryItem;
}());
exports.HistoryItem = HistoryItem;
var CompositionHistoryItem = (function (_super) {
    __extends(CompositionHistoryItem, _super);
    function CompositionHistoryItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.historyItems = [];
        _this.dataSyncItems = [];
        return _this;
    }
    CompositionHistoryItem.prototype.changeModified = function () {
        var item;
        for (var i = 0; item = this.historyItems[i]; i++)
            if (item.changeModified())
                return true;
        return false;
    };
    CompositionHistoryItem.prototype.redo = function (manipulator) {
        var item;
        for (var i = 0; item = this.historyItems[i]; i++)
            item.redo(manipulator);
    };
    CompositionHistoryItem.prototype.undo = function (manipulator) {
        var item;
        for (var i = this.dataSyncItems.length - 1; item = this.dataSyncItems[i]; i--)
            item.undo(manipulator);
        this.dataSyncItems = [];
        for (var i = this.historyItems.length - 1; item = this.historyItems[i]; i--)
            item.undo(manipulator);
    };
    CompositionHistoryItem.prototype.add = function (historyItem) {
        if (historyItem == null)
            throw new Error("cannot be null");
        this.historyItems.push(historyItem);
    };
    return CompositionHistoryItem;
}(HistoryItem));
exports.CompositionHistoryItem = CompositionHistoryItem;
//# sourceMappingURL=HistoryItem.js.map