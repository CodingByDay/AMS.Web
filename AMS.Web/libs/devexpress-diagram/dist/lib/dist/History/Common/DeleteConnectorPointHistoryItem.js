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
exports.DeleteConnectorPointHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var DeleteConnectorPointHistoryItem = (function (_super) {
    __extends(DeleteConnectorPointHistoryItem, _super);
    function DeleteConnectorPointHistoryItem(connectorKey, pointIndex) {
        var _this = _super.call(this) || this;
        _this.connectorKey = connectorKey;
        _this.pointIndex = pointIndex;
        return _this;
    }
    DeleteConnectorPointHistoryItem.prototype.redo = function (manipulator) {
        var _this = this;
        var connector = manipulator.model.findConnector(this.connectorKey);
        this.oldRenderContext = connector.tryCreateRenderPointsContext();
        this.oldPoint = connector.points[this.pointIndex].clone();
        manipulator.addDeleteConnectorPoint(connector, function (connector) {
            connector.deletePoint(_this.pointIndex);
            connector.onDeletePoint(_this.pointIndex);
        });
    };
    DeleteConnectorPointHistoryItem.prototype.undo = function (manipulator) {
        var _this = this;
        var connector = manipulator.model.findConnector(this.connectorKey);
        manipulator.addDeleteConnectorPoint(connector, function (connector) {
            connector.addPoint(_this.pointIndex, _this.oldPoint);
            connector.replaceRenderPoints(_this.oldRenderContext);
        });
    };
    return DeleteConnectorPointHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.DeleteConnectorPointHistoryItem = DeleteConnectorPointHistoryItem;
//# sourceMappingURL=DeleteConnectorPointHistoryItem.js.map