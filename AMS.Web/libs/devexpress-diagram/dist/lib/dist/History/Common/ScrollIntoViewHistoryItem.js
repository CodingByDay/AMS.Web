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
exports.ScrollIntoViewOnUndoHistoryItem = exports.ScrollIntoViewOnRedoHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var ScrollIntoViewOnRedoHistoryItem = (function (_super) {
    __extends(ScrollIntoViewOnRedoHistoryItem, _super);
    function ScrollIntoViewOnRedoHistoryItem(view, rectangle) {
        var _this = _super.call(this) || this;
        _this.view = view;
        _this.rectangle = rectangle;
        _this.view = view;
        _this.rectangle = rectangle.clone();
        return _this;
    }
    ScrollIntoViewOnRedoHistoryItem.prototype.redo = function (manipulator) {
        this.view.scrollIntoView(this.rectangle);
    };
    ScrollIntoViewOnRedoHistoryItem.prototype.undo = function (manipulator) { };
    return ScrollIntoViewOnRedoHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.ScrollIntoViewOnRedoHistoryItem = ScrollIntoViewOnRedoHistoryItem;
var ScrollIntoViewOnUndoHistoryItem = (function (_super) {
    __extends(ScrollIntoViewOnUndoHistoryItem, _super);
    function ScrollIntoViewOnUndoHistoryItem(view, rectangle) {
        var _this = _super.call(this) || this;
        _this.view = view;
        _this.rectangle = rectangle;
        _this.view = view;
        _this.rectangle = rectangle.clone();
        return _this;
    }
    ScrollIntoViewOnUndoHistoryItem.prototype.redo = function (manipulator) { };
    ScrollIntoViewOnUndoHistoryItem.prototype.undo = function (manipulator) {
        this.view.scrollIntoView(this.rectangle);
    };
    return ScrollIntoViewOnUndoHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.ScrollIntoViewOnUndoHistoryItem = ScrollIntoViewOnUndoHistoryItem;
//# sourceMappingURL=ScrollIntoViewHistoryItem.js.map