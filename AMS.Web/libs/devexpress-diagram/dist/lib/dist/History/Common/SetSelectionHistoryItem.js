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
exports.SetSelectionHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var SetSelectionHistoryItem = (function (_super) {
    __extends(SetSelectionHistoryItem, _super);
    function SetSelectionHistoryItem(selection, selectedKeys, forceChange) {
        var _this = _super.call(this) || this;
        _this.selectedKeys = selectedKeys;
        _this.selection = selection;
        _this.forceChange = forceChange;
        return _this;
    }
    SetSelectionHistoryItem.prototype.redo = function () {
        this.oldSelection = this.selection.getKeys().slice(0);
        this.selection.set(this.selectedKeys, this.forceChange);
    };
    SetSelectionHistoryItem.prototype.undo = function () {
        this.selection.set(this.oldSelection, this.forceChange);
    };
    return SetSelectionHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.SetSelectionHistoryItem = SetSelectionHistoryItem;
//# sourceMappingURL=SetSelectionHistoryItem.js.map