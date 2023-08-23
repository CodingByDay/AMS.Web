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
exports.ChangePageColorHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var ChangePageColorHistoryItem = (function (_super) {
    __extends(ChangePageColorHistoryItem, _super);
    function ChangePageColorHistoryItem(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    ChangePageColorHistoryItem.prototype.redo = function (manipulator) {
        this.oldValue = manipulator.model.pageColor;
        manipulator.changePageColor(this.value);
    };
    ChangePageColorHistoryItem.prototype.undo = function (manipulator) {
        manipulator.changePageColor(this.oldValue);
    };
    return ChangePageColorHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.ChangePageColorHistoryItem = ChangePageColorHistoryItem;
//# sourceMappingURL=ChangePageColorHistoryItem.js.map