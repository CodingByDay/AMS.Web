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
exports.AddShapeHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var Shape_1 = require("../../Model/Shapes/Shape");
var AddShapeHistoryItem = (function (_super) {
    __extends(AddShapeHistoryItem, _super);
    function AddShapeHistoryItem(shapeDescription, position, text, dataKey) {
        var _this = _super.call(this) || this;
        _this.shapeDescription = shapeDescription;
        _this.position = position;
        _this.text = text;
        _this.dataKey = dataKey;
        return _this;
    }
    AddShapeHistoryItem.prototype.redo = function (manipulator) {
        var shape = new Shape_1.Shape(this.shapeDescription, this.position);
        if (typeof this.text === "string")
            shape.text = this.text;
        if (this.dataKey !== undefined)
            shape.dataKey = this.dataKey;
        manipulator.addShape(shape, this.shapeKey);
        this.shapeKey = shape.key;
    };
    AddShapeHistoryItem.prototype.undo = function (manipulator) {
        manipulator.deleteShape(manipulator.model.findShape(this.shapeKey), true);
    };
    return AddShapeHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.AddShapeHistoryItem = AddShapeHistoryItem;
//# sourceMappingURL=AddShapeHistoryItem.js.map