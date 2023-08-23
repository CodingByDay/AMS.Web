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
exports.UpdatePositionsOnPageResizeHistoryItem = void 0;
var Connector_1 = require("../../Model/Connectors/Connector");
var Shape_1 = require("../../Model/Shapes/Shape");
var HistoryItem_1 = require("../HistoryItem");
var UpdatePositionsOnPageResizeHistoryItem = (function (_super) {
    __extends(UpdatePositionsOnPageResizeHistoryItem, _super);
    function UpdatePositionsOnPageResizeHistoryItem(offset) {
        var _this = _super.call(this) || this;
        _this.offset = offset;
        return _this;
    }
    UpdatePositionsOnPageResizeHistoryItem.prototype.redo = function (manipulator) {
        var _this = this;
        manipulator.model.iterateItems(function (item) {
            if (item instanceof Shape_1.Shape)
                manipulator.moveShape(item, _this.applyOffset(item.position, _this.offset.x, _this.offset.y));
            if (item instanceof Connector_1.Connector)
                manipulator.changeConnectorPoints(item, function (i) { return i.updatePointsOnPageResize(_this.offset.x, _this.offset.y); });
        });
    };
    UpdatePositionsOnPageResizeHistoryItem.prototype.undo = function (manipulator) {
        var _this = this;
        manipulator.model.iterateItems(function (item) {
            if (item instanceof Shape_1.Shape)
                manipulator.moveShape(item, _this.applyOffset(item.position, -_this.offset.x, -_this.offset.y));
            if (item instanceof Connector_1.Connector)
                manipulator.changeConnectorPoints(item, function (i) { return i.updatePointsOnPageResize(-_this.offset.x, -_this.offset.y); });
        });
    };
    UpdatePositionsOnPageResizeHistoryItem.prototype.applyOffset = function (point, offsetX, offsetY) {
        return point.clone().offset(offsetX, offsetY);
    };
    return UpdatePositionsOnPageResizeHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.UpdatePositionsOnPageResizeHistoryItem = UpdatePositionsOnPageResizeHistoryItem;
//# sourceMappingURL=UpdatePositionsOnPageResizeHistoryItem.js.map