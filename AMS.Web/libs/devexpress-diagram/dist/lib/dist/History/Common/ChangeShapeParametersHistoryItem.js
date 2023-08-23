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
exports.ChangeShapeParametersHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var ChangeShapeParametersHistoryItem = (function (_super) {
    __extends(ChangeShapeParametersHistoryItem, _super);
    function ChangeShapeParametersHistoryItem(shapeKey, parameters) {
        var _this = _super.call(this) || this;
        _this.shapeKey = shapeKey;
        _this.parameters = parameters;
        return _this;
    }
    ChangeShapeParametersHistoryItem.prototype.redo = function (manipulator) {
        var shape = manipulator.model.findShape(this.shapeKey);
        this.oldParameters = shape.parameters.clone();
        manipulator.changeShapeParameters(shape, this.parameters);
    };
    ChangeShapeParametersHistoryItem.prototype.undo = function (manipulator) {
        var shape = manipulator.model.findShape(this.shapeKey);
        manipulator.changeShapeParameters(shape, this.oldParameters);
    };
    return ChangeShapeParametersHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.ChangeShapeParametersHistoryItem = ChangeShapeParametersHistoryItem;
//# sourceMappingURL=ChangeShapeParametersHistoryItem.js.map