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
exports.ReplaceConnectorPointsHistoryItem = exports.ChangeConnectorPointsHistoryItem = exports.UpdateConnectorPointsHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var UpdateConnectorPointsHistoryItem = (function (_super) {
    __extends(UpdateConnectorPointsHistoryItem, _super);
    function UpdateConnectorPointsHistoryItem(connectorKey, newPoints) {
        var _this = _super.call(this) || this;
        _this.connectorKey = connectorKey;
        _this.newPoints = newPoints;
        return _this;
    }
    UpdateConnectorPointsHistoryItem.prototype.redo = function (manipulator) {
        var _this = this;
        var connector = manipulator.model.findConnector(this.connectorKey);
        this.oldRenderContext = connector.tryCreateRenderPointsContext();
        this.oldPoints = connector.points.map(function (p) { return p.clone(); });
        manipulator.changeConnectorPoints(connector, function (connector) {
            connector.points = _this.newPoints;
            _this.updateRenderPoints(connector);
        });
    };
    UpdateConnectorPointsHistoryItem.prototype.undo = function (manipulator) {
        var _this = this;
        var connector = manipulator.model.findConnector(this.connectorKey);
        manipulator.changeConnectorPoints(connector, function (connector) {
            connector.points = _this.oldPoints;
            connector.replaceRenderPoints(_this.oldRenderContext);
        });
    };
    return UpdateConnectorPointsHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.UpdateConnectorPointsHistoryItem = UpdateConnectorPointsHistoryItem;
var ChangeConnectorPointsHistoryItem = (function (_super) {
    __extends(ChangeConnectorPointsHistoryItem, _super);
    function ChangeConnectorPointsHistoryItem(connectorKey, newPoints, newRenderContext) {
        var _this = _super.call(this, connectorKey, newPoints) || this;
        _this.connectorKey = connectorKey;
        _this.newPoints = newPoints;
        _this.newRenderContext = newRenderContext;
        return _this;
    }
    ChangeConnectorPointsHistoryItem.prototype.updateRenderPoints = function (connector) {
        connector.replaceRenderPoints(this.newRenderContext);
    };
    return ChangeConnectorPointsHistoryItem;
}(UpdateConnectorPointsHistoryItem));
exports.ChangeConnectorPointsHistoryItem = ChangeConnectorPointsHistoryItem;
var ReplaceConnectorPointsHistoryItem = (function (_super) {
    __extends(ReplaceConnectorPointsHistoryItem, _super);
    function ReplaceConnectorPointsHistoryItem(connectorKey, newPoints) {
        var _this = _super.call(this, connectorKey, newPoints) || this;
        _this.connectorKey = connectorKey;
        _this.newPoints = newPoints;
        return _this;
    }
    ReplaceConnectorPointsHistoryItem.prototype.updateRenderPoints = function (connector) {
        connector.clearRenderPoints();
    };
    return ReplaceConnectorPointsHistoryItem;
}(UpdateConnectorPointsHistoryItem));
exports.ReplaceConnectorPointsHistoryItem = ReplaceConnectorPointsHistoryItem;
//# sourceMappingURL=ChangeConnectorPointsHistoryItem.js.map