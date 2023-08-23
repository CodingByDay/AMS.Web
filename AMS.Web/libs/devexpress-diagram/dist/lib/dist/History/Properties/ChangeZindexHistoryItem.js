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
exports.ChangeZindexHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var ChangeZindexHistoryItem = (function (_super) {
    __extends(ChangeZindexHistoryItem, _super);
    function ChangeZindexHistoryItem(item, zIndex) {
        var _this = _super.call(this) || this;
        _this.itemKey = item.key;
        _this.zIndex = zIndex;
        return _this;
    }
    ChangeZindexHistoryItem.prototype.redo = function (manipulator) {
        var item = manipulator.model.findItem(this.itemKey);
        this.oldZIndex = item.zIndex;
        manipulator.changeZIndex(item, this.zIndex);
    };
    ChangeZindexHistoryItem.prototype.undo = function (manipulator) {
        var item = manipulator.model.findItem(this.itemKey);
        manipulator.changeZIndex(item, this.oldZIndex);
    };
    return ChangeZindexHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.ChangeZindexHistoryItem = ChangeZindexHistoryItem;
//# sourceMappingURL=ChangeZindexHistoryItem.js.map