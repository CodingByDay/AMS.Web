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
exports.MoveConnectorRightAnglePointsHistoryItem = exports.MoveConnectorPointHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var MoveConnectorPointHistoryItem = (function (_super) {
    __extends(MoveConnectorPointHistoryItem, _super);
    function MoveConnectorPointHistoryItem(connectorKey, pointIndex, newPoint) {
        var _this = _super.call(this) || this;
        _this.connectorKey = connectorKey;
        _this.pointIndex = pointIndex;
        _this.newPoint = newPoint;
        return _this;
    }
    MoveConnectorPointHistoryItem.prototype.redo = function (manipulator) {
        var _this = this;
        var connector = manipulator.model.findConnector(this.connectorKey);
        this.oldPoint = connector.points[this.pointIndex].clone();
        this.renderContext = connector.tryCreateRenderPointsContext();
        manipulator.moveConnectorPoint(connector, this.pointIndex, function (connector) {
            connector.movePoint(_this.pointIndex, _this.newPoint);
            connector.onMovePoint(_this.pointIndex, _this.newPoint);
        });
    };
    MoveConnectorPointHistoryItem.prototype.undo = function (manipulator) {
        var _this = this;
        var connector = manipulator.model.findConnector(this.connectorKey);
        manipulator.moveConnectorPoint(connector, this.pointIndex, function (connector) {
            connector.movePoint(_this.pointIndex, _this.oldPoint);
            connector.replaceRenderPoints(_this.renderContext);
        });
    };
    return MoveConnectorPointHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.MoveConnectorPointHistoryItem = MoveConnectorPointHistoryItem;
var MoveConnectorRightAnglePointsHistoryItem = (function (_super) {
    __extends(MoveConnectorRightAnglePointsHistoryItem, _super);
    function MoveConnectorRightAnglePointsHistoryItem(connectorKey, beginPointIndex, newBeginPoint, lastPointIndex, newLastPoint) {
        var _this = _super.call(this) || this;
        _this.connectorKey = connectorKey;
        _this.beginPointIndex = beginPointIndex;
        _this.newBeginPoint = newBeginPoint;
        _this.lastPointIndex = lastPointIndex;
        _this.newLastPoint = newLastPoint;
        return _this;
    }
    MoveConnectorRightAnglePointsHistoryItem.prototype.redo = function (manipulator) {
        var _this = this;
        var connector = manipulator.model.findConnector(this.connectorKey);
        this.oldBeginPoint = connector.points[this.beginPointIndex].clone();
        this.oldLastPoint = connector.points[this.lastPointIndex].clone();
        this.renderContext = connector.tryCreateRenderPointsContext();
        manipulator.changeConnectorPoints(connector, function (connector) {
            connector.movePoint(_this.beginPointIndex, _this.newBeginPoint);
            connector.movePoint(_this.lastPointIndex, _this.newLastPoint);
            connector.onMovePoints(_this.beginPointIndex, _this.newBeginPoint, _this.lastPointIndex, _this.newLastPoint);
        });
    };
    MoveConnectorRightAnglePointsHistoryItem.prototype.undo = function (manipulator) {
        var _this = this;
        var connector = manipulator.model.findConnector(this.connectorKey);
        manipulator.changeConnectorPoints(connector, function (connector) {
            connector.movePoint(_this.beginPointIndex, _this.oldBeginPoint);
            connector.movePoint(_this.lastPointIndex, _this.oldLastPoint);
            connector.replaceRenderPoints(_this.renderContext);
        });
    };
    return MoveConnectorRightAnglePointsHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.MoveConnectorRightAnglePointsHistoryItem = MoveConnectorRightAnglePointsHistoryItem;
//# sourceMappingURL=MoveConnectorPointHistoryItem.js.map