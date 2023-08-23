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
exports.ChangeStyleTextHistoryItem = void 0;
var ChangeStyleHistoryItemBase_1 = require("./ChangeStyleHistoryItemBase");
var ChangeStyleTextHistoryItem = (function (_super) {
    __extends(ChangeStyleTextHistoryItem, _super);
    function ChangeStyleTextHistoryItem(itemKey, styleProperty, styleValue) {
        return _super.call(this, itemKey, styleProperty, styleValue) || this;
    }
    ChangeStyleTextHistoryItem.prototype.redo = function (manipulator) {
        var item = manipulator.model.findItem(this.itemKey);
        this.oldStyleValue = item.styleText[this.styleProperty];
        manipulator.changeStyleText(item, this.styleProperty, this.styleValue);
    };
    ChangeStyleTextHistoryItem.prototype.undo = function (manipulator) {
        var item = manipulator.model.findItem(this.itemKey);
        manipulator.changeStyleText(item, this.styleProperty, this.oldStyleValue);
    };
    return ChangeStyleTextHistoryItem;
}(ChangeStyleHistoryItemBase_1.ChangeStyleHistoryItemBase));
exports.ChangeStyleTextHistoryItem = ChangeStyleTextHistoryItem;
//# sourceMappingURL=ChangeStyleTextHistoryItem.js.map