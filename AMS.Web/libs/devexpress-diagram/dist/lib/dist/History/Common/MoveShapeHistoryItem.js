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
exports.MoveShapeHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var MoveShapeHistoryItem = (function (_super) {
    __extends(MoveShapeHistoryItem, _super);
    function MoveShapeHistoryItem(shapeKey, position) {
        var _this = _super.call(this) || this;
        _this.shapeKey = shapeKey;
        _this.position = position;
        return _this;
    }
    MoveShapeHistoryItem.prototype.redo = function (manipulator) {
        var shape = manipulator.model.findShape(this.shapeKey);
        this.oldPosition = shape.position.clone();
        manipulator.moveShape(shape, this.position);
    };
    MoveShapeHistoryItem.prototype.undo = function (manipulator) {
        var shape = manipulator.model.findShape(this.shapeKey);
        manipulator.moveShape(shape, this.oldPosition);
    };
    return MoveShapeHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.MoveShapeHistoryItem = MoveShapeHistoryItem;
//# sourceMappingURL=MoveShapeHistoryItem.js.map