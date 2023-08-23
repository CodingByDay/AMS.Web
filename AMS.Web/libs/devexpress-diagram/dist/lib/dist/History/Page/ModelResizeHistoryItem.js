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
exports.ModelResizeHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var offsets_1 = require("@devexpress/utils/lib/geometry/offsets");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var ModelResizeHistoryItem = (function (_super) {
    __extends(ModelResizeHistoryItem, _super);
    function ModelResizeHistoryItem(offset) {
        var _this = _super.call(this) || this;
        _this.offset = offset;
        return _this;
    }
    ModelResizeHistoryItem.prototype.redo = function (manipulator) {
        this.oldSize = manipulator.model.size.clone();
        this.backOffset = new offsets_1.Offsets(-this.offset.left, -this.offset.right, -this.offset.top, -this.offset.bottom);
        var newWidth = Math.max(this.oldSize.width + this.offset.left + this.offset.right, manipulator.model.pageWidth);
        var newHeight = Math.max(this.oldSize.height + this.offset.top + this.offset.bottom, manipulator.model.pageHeight);
        manipulator.changeModelSize(new size_1.Size(newWidth, newHeight), this.offset);
    };
    ModelResizeHistoryItem.prototype.undo = function (manipulator) {
        manipulator.changeModelSize(this.oldSize, this.backOffset);
    };
    return ModelResizeHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.ModelResizeHistoryItem = ModelResizeHistoryItem;
//# sourceMappingURL=ModelResizeHistoryItem.js.map