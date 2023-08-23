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
exports.DeleteShapeHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var DeleteShapeHistoryItem = (function (_super) {
    __extends(DeleteShapeHistoryItem, _super);
    function DeleteShapeHistoryItem(shapeKey, allowed) {
        if (allowed === void 0) { allowed = true; }
        var _this = _super.call(this) || this;
        _this.shapeKey = shapeKey;
        _this.allowed = allowed;
        return _this;
    }
    DeleteShapeHistoryItem.prototype.redo = function (manipulator) {
        var shape = manipulator.model.findShape(this.shapeKey);
        this.shape = shape.clone();
        manipulator.deleteShape(shape, this.allowed);
    };
    DeleteShapeHistoryItem.prototype.undo = function (manipulator) {
        manipulator.addShape(this.shape, this.shape.key);
    };
    return DeleteShapeHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.DeleteShapeHistoryItem = DeleteShapeHistoryItem;
//# sourceMappingURL=DeleteShapeHistoryItem.js.map