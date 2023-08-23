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
exports.ChangePageSizeHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var ChangePageSizeHistoryItem = (function (_super) {
    __extends(ChangePageSizeHistoryItem, _super);
    function ChangePageSizeHistoryItem(size) {
        var _this = _super.call(this) || this;
        _this.size = size;
        return _this;
    }
    ChangePageSizeHistoryItem.prototype.redo = function (manipulator) {
        this.oldSize = manipulator.model.pageSize;
        manipulator.changePageSize(this.size);
    };
    ChangePageSizeHistoryItem.prototype.undo = function (manipulator) {
        manipulator.changePageSize(this.oldSize);
    };
    return ChangePageSizeHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.ChangePageSizeHistoryItem = ChangePageSizeHistoryItem;
//# sourceMappingURL=ChangePageSizeHistoryItem.js.map