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
exports.ResizeShapeHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var ResizeShapeHistoryItem = (function (_super) {
    __extends(ResizeShapeHistoryItem, _super);
    function ResizeShapeHistoryItem(shapeKey, position, size) {
        var _this = _super.call(this) || this;
        _this.shapeKey = shapeKey;
        _this.position = position;
        _this.size = size;
        return _this;
    }
    ResizeShapeHistoryItem.prototype.redo = function (manipulator) {
        var shape = manipulator.model.findShape(this.shapeKey);
        this.oldPosition = shape.position.clone();
        this.oldSize = shape.size.clone();
        manipulator.resizeShape(shape, this.position, this.size);
    };
    ResizeShapeHistoryItem.prototype.undo = function (manipulator) {
        var shape = manipulator.model.findShape(this.shapeKey);
        manipulator.resizeShape(shape, this.oldPosition, this.oldSize);
    };
    return ResizeShapeHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.ResizeShapeHistoryItem = ResizeShapeHistoryItem;
//# sourceMappingURL=ResizeShapeHistoryItem.js.map