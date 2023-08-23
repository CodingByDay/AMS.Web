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
exports.ToggleShapeExpandedHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var ToggleShapeExpandedHistoryItem = (function (_super) {
    __extends(ToggleShapeExpandedHistoryItem, _super);
    function ToggleShapeExpandedHistoryItem(shape) {
        var _this = _super.call(this) || this;
        _this.shapeKey = shape.key;
        _this.expanded = shape.expanded;
        return _this;
    }
    ToggleShapeExpandedHistoryItem.prototype.redo = function (manipulator) {
        var shape = manipulator.model.findShape(this.shapeKey);
        manipulator.changeShapeExpanded(shape, !this.expanded);
    };
    ToggleShapeExpandedHistoryItem.prototype.undo = function (manipulator) {
        var shape = manipulator.model.findShape(this.shapeKey);
        manipulator.changeShapeExpanded(shape, this.expanded);
    };
    return ToggleShapeExpandedHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.ToggleShapeExpandedHistoryItem = ToggleShapeExpandedHistoryItem;
//# sourceMappingURL=ToggleShapeExpandedHistoryItem.js.map