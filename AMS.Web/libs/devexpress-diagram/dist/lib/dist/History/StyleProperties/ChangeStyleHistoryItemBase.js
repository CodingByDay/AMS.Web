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
exports.ChangeStyleHistoryItemBase = void 0;
var HistoryItem_1 = require("../HistoryItem");
var ChangeStyleHistoryItemBase = (function (_super) {
    __extends(ChangeStyleHistoryItemBase, _super);
    function ChangeStyleHistoryItemBase(itemKey, styleProperty, styleValue) {
        var _this = _super.call(this) || this;
        _this.itemKey = itemKey;
        _this.styleProperty = styleProperty;
        _this.styleValue = styleValue;
        return _this;
    }
    ChangeStyleHistoryItemBase.prototype.redo = function (manipulator) {
        var item = manipulator.model.findItem(this.itemKey);
        this.oldStyleValue = item.style[this.styleProperty];
        manipulator.changeStyle(item, this.styleProperty, this.styleValue);
    };
    ChangeStyleHistoryItemBase.prototype.undo = function (manipulator) {
        var item = manipulator.model.findItem(this.itemKey);
        manipulator.changeStyle(item, this.styleProperty, this.oldStyleValue);
    };
    return ChangeStyleHistoryItemBase;
}(HistoryItem_1.HistoryItem));
exports.ChangeStyleHistoryItemBase = ChangeStyleHistoryItemBase;
//# sourceMappingURL=ChangeStyleHistoryItemBase.js.map